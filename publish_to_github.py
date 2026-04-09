#!/usr/bin/env python3
"""
publish_to_github.py
====================
自動把 Perma Archiver 的所有檔案推送到 GitHub。

功能：
  - 上傳 XPI 到 GitHub Releases
  - 上傳 update.json、README.md、CSL 到 repo 根目錄
  - 自動計算 SHA-256 hash 並更新 update.json

使用方式：
  1. 設定下面的 CONFIG
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
import zipfile
from pathlib import Path

# ============================================================
#  CONFIG — 每次發版只需要改 VERSION
# ============================================================

GITHUB_TOKEN = "YOUR_GITHUB_TOKEN"   # github.com → Settings → Developer settings → Personal access tokens → Fine-grained tokens
GITHUB_USER  = "kirinccchang"
GITHUB_REPO  = "zotero-perma-archiver"
PLUGIN_ID    = "perma-archiver@kirinchang.law"
VERSION      = "1.2.1"

# 本機檔案路徑（相對於這個腳本的位置）
XPI_FILE     = f"perma-archiver_v{VERSION}.xpi"
CSL_FILE     = "bluebook-law-review-perma.csl"
README_FILE  = "README.md"

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

def create_release(version, xpi_path):
    """Create a GitHub Release and upload the XPI."""
    tag = f"v{version}"

    # Check if release already exists
    r = requests.get(f"{BASE_URL}/releases/tags/{tag}", headers=HEADERS)
    if r.status_code == 200:
        log(f"Release {tag} already exists — deleting and recreating...")
        release_id = r.json()["id"]
        requests.delete(f"{BASE_URL}/releases/{release_id}", headers=HEADERS)
        # Delete tag too
        requests.delete(f"{BASE_URL}/git/refs/tags/{tag}", headers=HEADERS)

    # Create release
    payload = {
        "tag_name": tag,
        "name": f"Perma Archiver v{version}",
        "body": f"""## Perma Archiver v{version}

### Installation
1. Download `{os.path.basename(xpi_path)}` below
2. In Zotero: **Tools → Plugins → ⚙️ → Install Add-on From File…**
3. Restart Zotero
4. **Tools → Perma Archiver → Set API Key…**

### What's included
- `{os.path.basename(xpi_path)}` — Zotero plugin
- `bluebook-law-review-KC.csl` — Bluebook CSL style with perma.cc support
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
    xpi_name = os.path.basename(xpi_path)
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

def generate_update_json(version, xpi_url, xpi_hash, output_path):
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
        err("請先設定 GITHUB_TOKEN")

    script_dir = Path(__file__).parent
    xpi_path    = script_dir / XPI_FILE
    csl_path    = script_dir / CSL_FILE
    readme_path = script_dir / README_FILE
    update_path = script_dir / "update.json"

    # Check files exist
    for p in [xpi_path, csl_path, readme_path]:
        if not p.exists():
            err(f"找不到檔案：{p}")

    print(f"\n{'='*50}")
    print(f"  Publishing Perma Archiver v{VERSION}")
    print(f"  Repo: github.com/{GITHUB_USER}/{GITHUB_REPO}")
    print(f"{'='*50}\n")

    # 1. Compute hash
    log("Computing XPI SHA-256...")
    xpi_hash = sha256_of_file(xpi_path)
    ok(f"SHA-256: {xpi_hash[:16]}...")

    # 2. Create Release + upload XPI
    log("Creating GitHub Release...")
    xpi_url = create_release(VERSION, xpi_path)

    # 3. Generate update.json
    log("Generating update.json...")
    generate_update_json(VERSION, xpi_url, xpi_hash, update_path)

    # 4. Upload files to repo
    log("Uploading files to repo...")
    upload_file("update.json",                update_path, f"Update update.json for v{VERSION}")
    upload_file("bluebook-law-review-KC.csl", csl_path,   f"Update CSL style for v{VERSION}")
    upload_file("README.md",                  readme_path, f"Update README for v{VERSION}")

    print(f"\n{'='*50}")
    print(f"  🎉 Published successfully!")
    print(f"  Release: https://github.com/{GITHUB_USER}/{GITHUB_REPO}/releases/tag/v{VERSION}")
    print(f"  Install: https://github.com/{GITHUB_USER}/{GITHUB_REPO}/releases/download/v{VERSION}/{XPI_FILE}")
    print(f"{'='*50}\n")

if __name__ == "__main__":
    main()
