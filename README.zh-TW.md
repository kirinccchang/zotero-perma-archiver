# Perma Archiver for Zotero

[English →](README.md)

**在 Zotero 中儲存網頁時，自動封存到 [perma.cc](https://perma.cc)，符合 Bluebook 22nd ed. Rule 18.2.1(d) 的引用規範。**

作者：[張正麒（Kirin Chang）](https://kirinchang.com/)，研究員，亞美法研究所（USALI），紐約大學法學院。

---

## 功能說明

每次使用 Zotero 瀏覽器擴充功能儲存網頁時，Perma Archiver 會自動：

1. 呼叫 perma.cc API，建立封存副本
2. 將封存網址（`https://perma.cc/XXXX-XXXX`）寫入 Zotero 條目的 Place 欄位
3. 使用附帶的 CSL 樣式產生引用時，自動輸出 `[https://perma.cc/XXXX-XXXX]`

**支援的條目類型：** 網頁（Webpage）· 部落格文章（Blog Post）· 報紙文章（Newspaper Article）· 雜誌文章（Magazine Article）· 論壇文章（Forum Post）· 預印本（Preprint）

---

## 安裝（兩步驟）

### 步驟一：安裝 Zotero 外掛

1. 從最新 Release 下載 [`perma-archiver_v1.2.0.xpi`](https://github.com/kirinccchang/zotero-perma-archiver/releases/download/v1.2.0/perma-archiver_v1.2.0)
2. 在 Zotero 7 或 8 中：前往 **工具（Tools） → 外掛（Plugins）**
3. 點選齒輪圖示 ⚙️ → **從檔案安裝附加元件（Install Add-on From File…）**
4. 選取下載的 `.xpi` 檔案
5. 依提示重新啟動 Zotero

### 步驟二：輸入 perma.cc API 金鑰

1. 至 [https://perma.cc/settings/tools](https://perma.cc/settings/tools) 免費取得 API 金鑰
2. 在 Zotero 中：**工具（Tools） → Perma Archiver → Set API Key…**
3. 貼上金鑰後按 OK

**選用：** 可透過 **工具（Tools） → Perma Archiver → Choose Save Folder…** 選擇儲存到哪個 perma.cc 資料夾。

---

## 安裝 Bluebook CSL 樣式

若要在引用中自動輸出 `[https://perma.cc/...]` 括號，需安裝附帶的 CSL 樣式：

1. 下載 [`bluebook-law-review-KC.csl`](https://raw.githubusercontent.com/kirinccchang/zotero-perma-archiver/main/bluebook-law-review-KC.csl)
2. 在 Zotero 中：**設定（Settings） → 引用（Cite） → 從檔案新增（Add from File…）**
3. 選取下載的 `.csl` 檔案

此樣式以 Bluebook Law Review（22nd ed.）為基礎，並加入 perma.cc 封存網址支援。

---

## 引用輸出範例

```
Rebecca J. Rose, The Law as Justice Gorsuch Sees It, Atlantic (Aug. 5, 2024),
https://www.theatlantic.com/ideas/archive/2024/08/interview-justice-neil-gorsuch-over-ruled/679342/
(last visited Apr. 9, 2026) [https://perma.cc/PT32-56LR].
```

---

## 系統需求

- **Zotero** 7.0 或更新版本（包含 8.x）
- **perma.cc 帳號** — 免費註冊：[https://perma.cc/register](https://perma.cc/register)
  - 免費方案：每月 10 次封存
  - 法學院／機構方案：次數更多或無限制（請洽所屬法學院圖書館）

## 測試環境

- macOS Sequoia 15.7.1 · Zotero 8.0.5

其他平台及 Zotero 版本或可正常運作，但尚未經過驗證。

---

## 已知限制

- 付費牆網站（NYT、WSJ 等）可能無法封存——perma.cc 無法繞過付費牆，請至 perma.cc 手動封存。
- 若部落格文章沒有發布日期，`[perma.cc]` 括號可能出現在 `(last visited DATE)` 之前。解決方法：在 Zotero 中手動填入發布日期。

---

## 疑難排解

**安裝後工具選單中沒有出現 Perma Archiver：**
請嘗試清除 Zotero 擴充套件快取：
1. 完全關閉 Zotero
2. 前往 `~/Library/Application Support/Zotero/Profiles/xxxxxxxx.default/`
3. 刪除 `extensions.json` 及 `extensions` 資料夾
4. 重新啟動 Zotero 並重新安裝外掛

**引用中沒有出現封存網址：**
請確認使用的是 `bluebook-law-review-KC.csl` 樣式，而非預設的 Bluebook 樣式。

---

## 授權

MIT License。詳見 [LICENSE](LICENSE)。

---

## 致謝

CSL 樣式以 Bruce D'Arcus、Nancy Sims 及貢獻者的 [Bluebook Law Review](http://www.zotero.org/styles/bluebook-law-review) 為基礎，針對 Bluebook 22nd edition 合規需求及 perma.cc 封存支援進行強化。
