#!/usr/bin/env python3
"""
publish_to_github.py
====================
自動把 Perma Archiver 的所有檔案推送到 GitHub。

功能：
  - 上傳 XPI 到 GitHub Releases（若 Release 已存在則替換 asset，不刪 Release）
  - 上傳 update.json、README.md、README.zh-TW.md、CSL、LICENSE、源碼 到 repo 根目錄
  - 自動計算 SHA-256 hash 並更新 update.json

使用方式：
  1. export GITHUB_TOKEN="github_pat_..."
  2. pip install requests
  3. python3 publish_to_github.py

每次發新版本只要改 VERSION，重跑這個腳本就好。
"""

import requests
import hashlib
import json
import base64
import os
import sys
import time
from pathlib import Path

# ============================================================
#  CONFIG — 每次發版只需要改 VERSION
# ============================================================

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "YOUR_GITHUB_TOKEN")
GITHUB_USER  = "kirinccchang"
GITHUB_REPO  = "zotero-perma-archiver"
PLUGIN_ID    = "perma-archiver@kirinchang.law"
VERSION      = "1.2.4"

# 本機檔案路徑（相對於這個腳本的位置）
XPI_FILE     = f"perma-archiver_v{VERSION}.xpi"
CSL_FILE     = "bluebook-law-review-perma.csl"

# ============================================================
#  HELPERS
# ============================================================

BASE_URL = f"https://api.github.com/repos/{GITHUB_USER}/{GITHUB_REPO}"
HEADERS  = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2022-11-28",
}

def log(msg): print(f"→ {msg}")
def ok(msg):  print(f"✓ {msg}")
def err(msg): print(f"✗ {msg}"); sys.exit(1)

def sha256_of_file(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()

def get_file_sha(path_in_repo):
    """Get existing file SHA (needed for updates)."""
    r = requests.get(f"{BASE_URL}/contents/{path_in_repo}", headers=HEADERS)
    if r.status_code == 200:
        return r.json().get("sha")
    return None

def upload_file(path_in_repo, local_path, commit_msg):
    """Create or update a file in the repo."""
    with open(local_path, 'rb') as f:
        content = base64.b64encode(f.read()).decode()

    existing_sha = get_file_sha(path_in_repo)
    payload = {
        "message": commit_msg,
        "content": content,
    }
    if existing_sha:
        payload["sha"] = existing_sha

    r = requests.put(
        f"{BASE_URL}/contents/{path_in_repo}",
        headers=HEADERS,
        json=payload,
    )
    if r.status_code in (200, 201):
        ok(f"Uploaded {path_in_repo}")
    else:
        err(f"Failed to upload {path_in_repo}: {r.status_code} {r.text[:200]}")

def get_or_create_release(version, xpi_path):
    """
    Get existing release or create a new one.
    NEVER deletes a release — instead replaces the XPI asset in place.
    This avoids the 'untagged-...' URL bug caused by delete+recreate race conditions.
    """
    tag = f"v{version}"
    xpi_name = os.path.basename(xpi_path)

    # Check if release already exists
    r = requests.get(f"{BASE_URL}/releases/tags/{tag}", headers=HEADERS)
    if r.status_code == 200:
        release = r.json()
        release_id = release["id"]
        upload_url = release["upload_url"].replace("{?name,label}", "")
        log(f"Release {tag} already exists (id={release_id}) — replacing XPI asset...")

        # Delete existing XPI asset if present
        for asset in release.get("assets", []):
            if asset["name"] == xpi_name:
                del_r = requests.delete(
                    f"{BASE_URL}/releases/assets/{asset['id']}",
                    headers=HEADERS
                )
                if del_r.status_code == 204:
                    log(f"Deleted old asset: {asset['name']}")
                else:
                    log(f"Warning: could not delete old asset ({del_r.status_code})")
                break
    else:
        # Create new release
        payload = {
            "tag_name": tag,
            "name": f"Perma Archiver v{version}",
            "body": f"""## Perma Archiver v{version}

### Installation
1. Download `{xpi_name}` below
2. In Zotero: **Tools → Plugins → ⚙️ → Install Add-on From File…**
3. Restart Zotero
4. **Tools → Perma Archiver → Set API Key…**

### What's included
- `{xpi_name}` — Zotero plugin
- `bluebook-law-review-perma.csl` — Bluebook CSL style with perma.cc support
- `update.json` — Auto-update manifest

See [README](https://github.com/{GITHUB_USER}/{GITHUB_REPO}#readme) for full documentation.
""",
            "draft": False,
            "prerelease": False,
        }
        r = requests.post(f"{BASE_URL}/releases", headers=HEADERS, json=payload)
        if r.status_code != 201:
            err(f"Failed to create release: {r.status_code} {r.text[:300]}")
        release = r.json()
        upload_url = release["upload_url"].replace("{?name,label}", "")
        ok(f"Created release {tag}")

    # Upload XPI asset
    with open(xpi_path, 'rb') as f:
        xpi_data = f.read()

    r = requests.post(
        f"{upload_url}?name={xpi_name}",
        headers={**HEADERS, "Content-Type": "application/octet-stream"},
        data=xpi_data,
    )
    if r.status_code == 201:
        download_url = r.json()["browser_download_url"]
        ok(f"Uploaded XPI → {download_url}")
        return download_url
    else:
        err(f"Failed to upload XPI: {r.status_code} {r.text[:200]}")

def generate_update_json(version, xpi_hash, output_path):
    # Hardcode the canonical URL — never use GitHub's returned URL
    # which can be 'untagged-...' if the release was just created
    xpi_url = f"https://github.com/{GITHUB_USER}/{GITHUB_REPO}/releases/download/v{version}/perma-archiver_v{version}.xpi"
    update = {
        "addons": {
            PLUGIN_ID: {
                "updates": [{
                    "version": version,
                    "update_link": xpi_url,
                    "update_hash": f"sha256:{xpi_hash}",
                    "applications": {
                        "zotero": {"strict_min_version": "7.0"}
                    }
                }]
            }
        }
    }
    with open(output_path, 'w') as f:
        json.dump(update, f, indent=2)
    ok(f"Generated {output_path}")

# ============================================================
#  MAIN
# ============================================================

def main():
    if GITHUB_TOKEN == "YOUR_GITHUB_TOKEN":
        err("請先設定環境變數：export GITHUB_TOKEN='github_pat_...'")

    script_dir   = Path(__file__).parent
    xpi_path     = script_dir / XPI_FILE
    csl_path     = script_dir / CSL_FILE
    readme_path  = script_dir / "README.md"
    readme_zh_path = script_dir / "README.zh-TW.md"
    license_path = script_dir / "LICENSE"
    bootstrap_path = script_dir / "bootstrap.js"
    content_path = script_dir / "content.js"
    manifest_path = script_dir / "manifest.json"
    update_path  = script_dir / "update.json"

    # Check required files exist
    for p in [xpi_path, csl_path, readme_path, readme_zh_path, license_path,
              bootstrap_path, content_path, manifest_path]:
        if not p.exists():
            err(f"找不到檔案：{p}")

    # Auto-fix README download links to match VERSION (link text + path + filename)
    import re
    for readme in [readme_path, readme_zh_path]:
        text = readme.read_text()
        # Fix link text: [perma-archiver_vX.X.X.xpi]
        fixed = re.sub(
            r'perma-archiver_v[\d.]+\.xpi',
            f'perma-archiver_v{VERSION}.xpi',
            text
        )
        # Fix URL path: /releases/download/vX.X.X/
        fixed = re.sub(
            r'/releases/download/v[\d.]+/',
            f'/releases/download/v{VERSION}/',
            fixed
        )
        if fixed != text:
            readme.write_text(fixed)
            log(f"Auto-fixed download link in {readme.name}")

    print(f"\n{'='*50}")
    print(f"  Publishing Perma Archiver v{VERSION}")
    print(f"  Repo: github.com/{GITHUB_USER}/{GITHUB_REPO}")
    print(f"{'='*50}\n")

    # 1. Compute hash
    log("Computing XPI SHA-256...")
    xpi_hash = sha256_of_file(xpi_path)
    ok(f"SHA-256: {xpi_hash[:16]}...")

    # 2. Get or create Release + upload XPI (never deletes release)
    log("Uploading XPI to GitHub Release...")
    get_or_create_release(VERSION, xpi_path)

    # 3. Generate update.json with hardcoded canonical URL
    log("Generating update.json...")
    generate_update_json(VERSION, xpi_hash, update_path)

    # 4. Upload all files to repo
    log("Uploading files to repo...")
    upload_file("update.json",                    update_path,     f"v{VERSION}: update update.json")
    upload_file("bluebook-law-review-perma.csl",  csl_path,        f"v{VERSION}: update CSL style")
    upload_file("README.md",                      readme_path,     f"v{VERSION}: update README")
    upload_file("README.zh-TW.md",               readme_zh_path,  f"v{VERSION}: update README (zh-TW)")
    upload_file("LICENSE",                        license_path,    f"v{VERSION}: update LICENSE (MPL 2.0)")
    upload_file("bootstrap.js",                   bootstrap_path,  f"v{VERSION}: update bootstrap.js")
    upload_file("content.js",                     content_path,    f"v{VERSION}: update content.js")
    upload_file("manifest.json",                  manifest_path,   f"v{VERSION}: update manifest.json")

    print(f"\n{'='*50}")
    print(f"  Published successfully!")
    print(f"  Release: https://github.com/{GITHUB_USER}/{GITHUB_REPO}/releases/tag/v{VERSION}")
    print(f"  Install: https://github.com/{GITHUB_USER}/{GITHUB_REPO}/releases/download/v{VERSION}/{XPI_FILE}")
    print(f"{'='*50}\n")

if __name__ == "__main__":
    main()
