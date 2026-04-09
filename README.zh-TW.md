# Perma Archiver for Zotero

[English →](README.md)

**在 Zotero 中儲存網頁時，自動封存到 [perma.cc](https://perma.cc)，符合 Bluebook 22nd ed. Rule 18.2.1(d) 的引用規範。**

作者：[張正麒（Kirin Chang）](https://kirinchang.com/)，研究員，亞美法研究所（USALI），紐約大學法學院。

---

## 背景說明

### Zotero 是什麼？

[Zotero](https://www.zotero.org/) 是一款免費、開放原始碼的文獻管理工具。在瀏覽器中閱讀文章、網頁或判決時，點一下 Zotero 瀏覽器擴充功能，就能自動將標題、作者、日期、網址等資訊儲存到你的文獻庫。之後 Zotero 可以自動產生各種引用格式的腳注與參考書目，廣受法律學者、學生和研究人員使用。

### perma.cc 是什麼？

[perma.cc](https://perma.cc) 是哈佛法學院 Berkman Klein Center 專為法律引用設計的網頁封存服務。封存一個網址後，perma.cc 會為該頁面建立永久快照，並產生一個固定短網址（例如 `https://perma.cc/PT32-56LR`）——即使原始網頁之後被刪除、移轉或修改，這個連結永遠不變。

perma.cc 由哈佛法學院及法學圖書館聯盟共同營運，是 Bluebook 中唯一具名推薦的封存工具。

### 問題所在：連結失效（Link Rot）

研究顯示，**《哈佛法律評論》中超過 70% 的引用網址**已無法連結到原始內容；**美國最高法院判決中超過 50% 的引用網址**同樣受到影響。論文發表後僅一年，約 20% 的網址就已失效；五年後，失效比例超過 50%。

法律論證的基礎是讀者能夠查驗引用的資料來源。一旦連結失效，引用就失去了可驗證性——而這個問題是永久性的。

### Bluebook Rule 18.2.1(d)——第 22 版（2025）改了什麼？

**第 21 版**鼓勵封存網路資料來源作為最佳實務，但並非強制要求。

**第 22 版（2025）將封存列為強制規定**：所有引用的網路內容必須「在永久儲存環境中擷取並保存」。符合規定的三種方法如下：

| 方法 | 適用情境 |
|------|----------|
| perma.cc 或等效封存服務 | 標準方法，適用於可公開存取的頁面（部落格、新聞、政府網站、社群媒體等） |
| 永久網址（DOI / Handle） | 若資料來源已有穩定的永久識別碼，直接引用即可，無需另行封存 |
| 本地存檔（on file with the author） | 適用於付費牆內容，引用末尾加註 `(on file with the author)` |

網路資料來源的標準引用格式：

```
Author, Title, Publication (Date), URL (last visited DATE) [https://perma.cc/XXXX-XXXX].
```

法律評論的編輯現在應拒絕接受未附合規封存連結或本地存檔的網路引用。

### 為什麼需要這個工具？

傳統手動流程相當繁瑣：在 Zotero 存網頁 → 前往 perma.cc → 貼上網址 → 等待封存 → 複製 perma.cc 連結 → 貼回 Zotero。一篇論文若有數十筆網路引用，這個過程非常耗時。

Perma Archiver 將整個流程自動化。只要用 Zotero 儲存支援的條目，外掛就會在背景呼叫 perma.cc API，並自動將封存網址寫入條目——完全不需要額外操作。

---

## 功能說明

每次使用 Zotero 瀏覽器擴充功能儲存網頁時，Perma Archiver 會自動：

1. 呼叫 perma.cc API，建立封存副本
2. 將封存網址（`https://perma.cc/XXXX-XXXX`）寫入 Zotero 條目的 **Place** 欄位
3. 使用附帶的 CSL 樣式產生引用時，自動輸出 `[https://perma.cc/XXXX-XXXX]`

**支援的條目類型：** 網頁（Webpage）· 部落格文章（Blog Post）· 報紙文章（Newspaper Article）· 雜誌文章（Magazine Article）· 論壇文章（Forum Post）· 預印本（Preprint）

---

## 安裝（兩步驟）

### 步驟一：安裝 Zotero 外掛

1. 從最新 Release 下載 [`perma-archiver_v1.2.0.xpi`](https://github.com/kirinccchang/zotero-perma-archiver/releases/download/v1.2.0/perma-archiver_v1.2.0.xpi)
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

- 付費牆網站（NYT、WSJ 等）可能無法封存——perma.cc 無法繞過付費牆。請至 perma.cc 手動封存，並依 Rule 18.2.1(d) 改用 `(on file with the author)` 格式。
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
