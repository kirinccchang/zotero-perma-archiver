# Perma Archiver — Claude Code Instructions

## 專案說明
Zotero 插件，自動把網頁封存到 perma.cc，符合 Bluebook 22nd ed. Rule 18.2.1(d)。

## 檔案結構
```
perma-archiver/
├── bootstrap.js          # Zotero 插件入口（bootstrap scope）
├── content.js            # 插件主邏輯（window scope，Zotero 可用）
├── manifest.json         # 插件 manifest
├── icon48.png / icon96.png
├── bluebook-law-review-KC.csl  # CSL 引用格式
├── publish_to_github.py  # 自動發布腳本
├── update.json           # Zotero 自動更新 manifest
└── README.md
```

## GitHub
- Repo: https://github.com/kirinccchang/zotero-perma-archiver
- Token: 存在環境變數 GITHUB_TOKEN

## 常用任務

### 發布新版本
1. 更新 manifest.json 裡的 version
2. 重新打包 XPI：`python3 build.py`
3. 執行發布：`python3 publish_to_github.py`

### 打包 XPI
```bash
python3 build.py
```
產生 `perma-archiver_vX.X.X.xpi`

### 測試
把 XPI 裝進 Zotero 7/8 測試。
主要測試點：
- Tools 選單有 Perma Archiver
- 存網頁後 Place 欄位自動出現 perma.cc URL
- Create Bibliography 輸出有 [perma.cc/...]

## 重要技術細節
- bootstrap.js 跑在 sandbox，Zotero 不可用
- content.js 透過 loadSubScript(url, win) 載入 window scope
- perma.cc URL 存在 Zotero 的 place 欄位（→ CSL publisher-place）
- blogPost/forumPost 沒有 place 欄位，fallback 存在 url 欄位
- Zotero 8 需要 update_url 和 strict_max_version: "8.0.*"

## 環境變數
```bash
export GITHUB_TOKEN="github_pat_..."
```
