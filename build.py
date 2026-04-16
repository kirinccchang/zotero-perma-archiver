#!/usr/bin/env python3
"""
build.py — 打包 Perma Archiver XPI
用法：python3 build.py
"""
import zipfile, json
from pathlib import Path

script_dir = Path(__file__).parent
manifest   = json.load(open(script_dir / 'manifest.json'))
version    = manifest['version']
out_name   = f"perma-archiver_v{version}.xpi"
out_path   = script_dir / out_name

files = {
    'manifest.json': (script_dir / 'manifest.json').read_bytes(),
    'bootstrap.js':  (script_dir / 'bootstrap.js').read_bytes(),
    'content.js':    (script_dir / 'content.js').read_bytes(),
    'icon48.png':    (script_dir / 'icon48.png').read_bytes(),
    'icon96.png':    (script_dir / 'icon96.png').read_bytes(),
}

with zipfile.ZipFile(out_path, 'w', zipfile.ZIP_DEFLATED) as z:
    for name, data in files.items():
        z.writestr(name, data)

print(f"✓ Built: {out_name}")
print(f"  Version: {version}")
print(f"  Size: {out_path.stat().st_size:,} bytes")
