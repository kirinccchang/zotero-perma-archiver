# Perma Archiver for Zotero

[English →](README.md)

<div align="center">

![Zotero](https://img.shields.io/badge/Zotero-7%20%7C%208-CC2936?style=for-the-badge&logo=zotero&logoColor=white)
![GitHub release](https://img.shields.io/github/v/release/kirinccchang/zotero-perma-archiver?style=for-the-badge)
![License](https://img.shields.io/badge/License-AGPL%20v3-blue?style=for-the-badge)

</div>

**在 Zotero 中儲存任何有網址的項目時，自動封存到 <a href="https://perma.cc" target="_blank" rel="noopener noreferrer">perma.cc</a>。文獻庫裡已有大量未封存的項目？全選後按右鍵，一次補齊。`[perma.cc/...]` 連結自動加入 Word 引用中。完全符合 Bluebook 22nd ed. Rule 18.2.1(d) 規範，不需要任何技術知識。**

作者：<a href="https://kirinchang.com/" target="_blank" rel="noopener noreferrer">張正麒（Cheng-chi "Kirin" Chang）</a>，美國紐約大學法學院「<a href="https://usali.org/people#kirin-chang" target="_blank" rel="noopener noreferrer">亞美法研究所</a>」專任研究員，同時兼任美國埃默里大學法學院「人工智慧與未來工作計畫」附屬研究員，曾任該計畫副主任暨學術研究員。

---

## 這是什麼？為什麼需要它？

**<a href="https://www.zotero.org/" target="_blank" rel="noopener noreferrer">Zotero</a>** 是一款免費的文獻管理工具，點一下就能把網頁或文章存進你的研究資料庫。**<a href="https://perma.cc" target="_blank" rel="noopener noreferrer">perma.cc</a>** 是哈佛法學院營運的免費封存服務，能為任何網頁建立永久備份，讓引用連結永遠不會失效。這個外掛讓兩者自動串聯。

**Bluebook 第 22 版（2025）將網路引用的封存列為強制規定。** 研究顯示《哈佛法律評論》超過 70% 的引用網址已失效。傳統做法每筆網址需手動操作五個步驟——前往 perma.cc、貼上網址、等待封存、複製連結、貼回 Zotero——一篇論文下來極為耗時。

> [!TIP]
> **兩種情境，都是自動的：**
>
> **新項目：** 你在 Zotero 存任何有網址的項目 → 外掛在背景自動封存到 perma.cc → 之後在 Word 插入引用時，`[perma.cc/...]` 括號自動出現。不需要任何額外操作。
>
> **既有文獻庫：** 安裝前就已存在 Zotero 的項目怎麼辦？選取它們，按右鍵，選 **Archive to Perma.cc**，完成。外掛會逐一處理，失敗的項目自動加上 **`perma-failed`** 標籤，方便你逐一補齊。

> [!NOTE]
> **想了解更多背景？** 展開下方說明，了解 Zotero 與 perma.cc 是什麼、連結失效問題有多嚴重，以及 Bluebook 第 22 版的具體要求。

<details>
<summary>▶ Zotero 是什麼？perma.cc 是什麼？這個外掛為何存在？（點此展開）</summary>

### Zotero 是什麼？

<a href="https://www.zotero.org/" target="_blank" rel="noopener noreferrer">Zotero</a> 是一款免費、開放原始碼的文獻管理工具。在瀏覽器中閱讀文章、網頁或判決時，點一下 Zotero 瀏覽器擴充功能，就能自動將標題、作者、日期、網址等資訊儲存到你的文獻庫。之後 Zotero 可以自動產生各種引用格式的腳注與參考書目，廣受法律學者、學生和研究人員使用。

### perma.cc 是什麼？

<a href="https://perma.cc" target="_blank" rel="noopener noreferrer">perma.cc</a> 是哈佛法學院 Berkman Klein Center 專為法律引用設計的網頁封存服務。封存一個網址後，perma.cc 會為該頁面建立永久快照，並產生一個固定短網址（例如 `https://perma.cc/PT32-56LR`）——即使原始網頁之後被刪除、移轉或修改，這個連結永遠不變。

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

法律評論的編輯現在應拒絕接受未附合規封存連結或本地存檔的網路引用。

### 為什麼需要這個外掛？

傳統手動流程相當繁瑣：在 Zotero 存網頁 → 前往 perma.cc → 貼上網址 → 等待封存 → 複製 perma.cc 連結 → 貼回 Zotero。一篇論文若有數十筆網路引用，這個過程非常耗時。

Perma Archiver 將整個流程自動化。只要用 Zotero 儲存有網址的項目，外掛就會在背景自動完成封存，並將封存連結寫入 Zotero——完全不需要額外操作。

</details>

---

## 開始之前

你需要準備：

- [ ] 電腦上已安裝 **Zotero** → <a href="https://www.zotero.org/download/" target="_blank" rel="noopener noreferrer">在 zotero.org 免費下載</a>
- [ ] **perma.cc 帳號** → <a href="https://perma.cc/register" target="_blank" rel="noopener noreferrer">在 perma.cc 免費註冊</a>（約 2 分鐘）
- [ ] **perma.cc 帳號金鑰（API Key）** → 登入後前往 <a href="https://perma.cc/settings/tools" target="_blank" rel="noopener noreferrer">perma.cc/settings/tools</a>。若從未產生過金鑰，請先點選頁面上的 **「Generate an API key」** 按鈕，金鑰便會顯示在該頁面。複製後備用。

> [!IMPORTANT]
> **個人免費帳號只有 10 個試用封存連結。** 用完後需要機構帳號或付費方案才能繼續封存。大多數法學院圖書館為學生、教師及期刊編輯提供免費的 perma.cc 使用權——建議先向圖書館員確認，再決定是否個人申請。你的剩餘額度可隨時在 <a href="https://perma.cc/settings/tools" target="_blank" rel="noopener noreferrer">perma.cc/settings/tools</a> 查看。

---

## 安裝步驟

### 步驟一：下載並安裝外掛檔案

1. 點此下載：**<a href="https://github.com/kirinccchang/zotero-perma-archiver/releases/download/v1.3.2/perma-archiver_v1.3.2.xpi" target="_blank" rel="noopener noreferrer">perma-archiver_v1.3.2.xpi</a>**
   - 瀏覽器可能會警告你正在下載 `.xpi` 檔案——這是正常的，允許下載即可。
   - 存到容易找到的地方（例如桌面）。

2. 在電腦上開啟 **Zotero**。

3. 點選畫面上方選單列中的 **Tools（工具）**。

4. 在下拉選單中點選 **Plugins（外掛）**。

5. 在 Plugins 視窗的右上角找到小小的**齒輪圖示 ⚙️**，點一下。

6. 點選 **Install Add-on From File…（從檔案安裝附加元件）**。

7. 檔案瀏覽器會開啟，找到你剛才下載的 `.xpi` 檔案，選取後點 **Open（開啟）**。

8. 系統詢問是否重新啟動 Zotero 時，點 **Restart Now（立即重新啟動）**。

> [!NOTE]
> 重新啟動後，你應該會在選單列的 **Tools** 底下看到 **Perma Archiver**。如果沒有出現，請參閱下方的[疑難排解](#疑難排解)。

---

### 步驟二：輸入帳號金鑰

1. 在 Zotero 中，點選選單列的 **Tools（工具）**。
2. 將滑鼠移到 **Perma Archiver** 上。
3. 點選 **Set API Key…**
4. 在跳出的對話框中貼上你的金鑰，點 **OK**。
5. 外掛會立即嘗試連線 perma.cc 並顯示你的資料夾清單——這代表金鑰正確且連線正常。

> [!IMPORTANT]
> 完成此步驟前，外掛不會封存任何內容。這組金鑰讓外掛知道要存入你的 perma.cc 帳號，不可略過。
>
> **如果輸入金鑰後沒有出現資料夾清單**，代表金鑰未被接受。請確認你從 <a href="https://perma.cc/settings/tools" target="_blank" rel="noopener noreferrer">perma.cc/settings/tools</a> 複製的金鑰是否正確。若從未產生過金鑰，請先點頁面上的 **「Generate an API key」** 按鈕。

**選用——選擇儲存資料夾：**

預設情況下，所有封存會存入 perma.cc 的 **Personal Links** 資料夾。輸入 API 金鑰後，資料夾選擇視窗會自動彈出。之後也可以隨時透過 **Tools → Perma Archiver → Choose Save Folder…** 重新選擇。

> [!TIP]
> 法學院帳號通常由圖書館預先建立了共用組織資料夾。如果你是期刊編輯或研究助理，可以詢問法學院圖書館員是否有機構專用的 perma.cc 資料夾。

---

### 步驟三：安裝 Bluebook 引用格式樣式（選用——僅限 Word 使用者）

> [!NOTE]
> **步驟一和步驟二就已完整。** 安裝外掛並輸入金鑰後，perma.cc 連結會直接寫入你的 Zotero 條目，你可以在 Zotero 中查看、手動複製，或依需求使用。
>
> 步驟三僅適用於使用 **Zotero 的 Word 插件**在 Microsoft Word 或 Google Docs 中插入引用的使用者。安裝後，腳注中的 `[https://perma.cc/...]` 括號會自動出現。
>
> Zotero 的 Word 插件隨 Zotero 桌面版自動安裝至 Word。若尚未設定，請參考 <a href="https://www.zotero.org/support/word_processor_plugin_usage" target="_blank" rel="noopener noreferrer">Zotero 文書處理器插件說明文件</a>。

此步驟下載一個告訴 Zotero「如何排版 Bluebook 腳注」的小檔案，不需要任何技術知識。

1. 點此下載：**<a href="https://raw.githubusercontent.com/kirinccchang/zotero-perma-archiver/main/bluebook-law-review-perma.csl" target="_blank" rel="noopener noreferrer">bluebook-law-review-perma.csl</a>**
   - 若瀏覽器將其顯示為純文字而非下載，請右鍵點擊連結，選擇**另存連結為（Save Link As…）**。

2. 在 Zotero 中開啟**設定（Settings）**（Mac：**Zotero → Settings**；Windows：**Edit → Preferences**）。

3. 點選 **Cite（引用）** 分頁。

4. 在「Citation Styles」下方，點選 **+** 按鈕或 **Add from File…（從檔案新增）**。

5. 選取剛才下載的 `.csl` 檔案，點 **Open（開啟）**。

6. 之後在 Word 或 Google Docs 中插入引用時，選擇 **Bluebook Law Review (perma.cc)** 作為引用樣式。

> [!TIP]
> 安裝完成後，樣式會自動運作。只要照常使用 Zotero 的「Add/Edit Citation」功能，perma.cc 連結就會自動出現，不需要任何額外操作。

---

## 設定完成後的運作方式

### 自動封存——新條目

安裝外掛並輸入 API 金鑰後，**每次新儲存都全自動處理**：

1. 你點一下 Zotero 瀏覽器擴充功能圖示，儲存任何有網址的條目
2. 外掛在背景自動完成封存（需要幾秒鐘）
3. perma.cc 連結直接寫入你的 Zotero 條目。查看方式：在 Zotero 中點選該條目，看右側的 **Info（資訊）** 分頁。
   - 大多數條目類型（新聞、網頁、政府文件等）會存在 **Place（地點）** 欄位。
   - 部落格文章、論壇貼文等沒有 Place 欄位的類型，會附加在 **URL** 欄位末尾，格式為：`https://原始網址 [https://perma.cc/XXXX-XXXX]`。

若你使用 Zotero 的 Word 插件（步驟三），引用腳注會自動加上 perma.cc 括號：

```
Rebecca J. Rose, The Law as Justice Gorsuch Sees It, Atlantic (Aug. 5, 2024),
https://www.theatlantic.com/ideas/archive/2024/08/interview-justice-neil-gorsuch-over-ruled/679342/
(last visited Apr. 9, 2026) [https://perma.cc/PT32-56LR].
```

### 批次歸檔——補齊既有文獻庫

安裝前就已存在 Zotero 的條目也能一次補齊：

1. 在文獻庫中選取條目（**⌘A** 或 **Ctrl+A** 全選，或按住 **⌘/Ctrl** 逐一點選）
2. 對選取的項目按右鍵
3. 選擇 **Archive to Perma.cc**
4. 確認後，外掛逐一處理並顯示完成摘要

封存失敗的項目（例如付費牆頁面）會自動加上 **`perma-failed`** 標籤（一個出現在 Zotero 文獻庫中的彩色標記），方便你集中找出並手動處理。成功重試後，標籤自動移除。

**支援所有有網址的 Zotero 條目**——網頁、部落格文章、報紙文章、報告、政府文件等，均適用。

> [!IMPORTANT]
> **批次歸檔大量條目前，請先確認你的 perma.cc 封存額度。** 個人試用帳號只有 **10 個連結**——若中途用完，剩餘條目會被標記為 `perma-failed`。法學院機構帳號通常為無限量。開始前請至 <a href="https://perma.cc/settings/tools" target="_blank" rel="noopener noreferrer">perma.cc/settings/tools</a> 確認剩餘額度。

---

## 已知限制

> [!WARNING]
> **取得 perma.cc 連結，不代表內容已成功封存。** 若原始頁面在封存當下已失效、回傳錯誤，或位於付費牆後方，perma.cc 仍可能產生連結——但快照會顯示空白頁或「Capture Failed」錯誤。**請在提交論文前逐一點開 perma.cc 連結，確認內容正常顯示。**
>
> **若封存失敗**，你可以在不換連結的情況下手動補救：開啟該 perma.cc 連結，點選 **「Show record details」**，再使用 **「Upload file」** 將頁面截圖（JPG、PNG、GIF）或 PDF 上傳取代失敗的快照，最大支援 200 MB。這樣就能保留原本的 perma.cc 網址，同時補上正確的快照內容。

> [!WARNING]
> **付費牆網站**（NYT、WSJ、需登入的 SSRN 頁面等）可能無法封存——perma.cc 無法繞過付費牆。請至 perma.cc 手動封存，並依 Rule 18.2.1(d) 在引用末尾改用 `(on file with the author)` 格式。

> [!NOTE]
> 若部落格文章沒有發布日期，`[perma.cc]` 括號可能在引用中出現的位置略有偏差。解決方法：在 Zotero 條目中手動填入發布日期。

---

## 疑難排解

<details>
<summary>安裝後工具選單中沒有出現 Perma Archiver</summary>

請嘗試清除 Zotero 擴充套件快取：

1. 完全關閉 Zotero（確認不是只有最小化）
2. 前往你的 Zotero 個人資料夾：
   - **Mac：** 開啟 Finder，按 **⌘ Shift G**，貼上：`~/Library/Application Support/Zotero/Profiles/`
   - **Windows：** 開啟檔案總管，點選上方網址列，貼上：`%APPDATA%\Zotero\Zotero\Profiles\`
3. 開啟名稱很長、結尾為 `.default` 的資料夾
4. 刪除 `extensions.json` 檔案及 `extensions` 資料夾
5. 重新啟動 Zotero 並從步驟一重新安裝外掛

</details>

<details>
<summary>引用中沒有出現封存網址</summary>

請確認你選擇的是 **Bluebook Law Review (perma.cc)** 樣式，而非 Zotero 內建的預設「Bluebook Law Review」樣式。只有 perma.cc 版本才包含 perma.cc 括號。

</details>

<details>
<summary>外掛有在執行，但沒有封存任何內容</summary>

請確認：
1. 已完成步驟二（輸入 API 金鑰）
2. 條目有網址欄位（外掛會封存任何有網址的條目）
3. 封存功能已開啟：**Tools → Perma Archiver → Enable** 應為勾選狀態

</details>

---

## 測試環境

- macOS Sequoia 15.7.1 · Zotero 8.0.5
- Windows 11 Enterprise（26200.8037）· Zotero 8.0.4
- Windows 11 Enterprise（26200.8037）· Zotero 7.0.32

其他平台及 Zotero 版本或可正常運作，但尚未經過驗證。

---

## lawreview.tools 工具套件

Zotero Perma Archiver 是 **[lawreview.tools](https://lawreview.tools)** 免費開源工具套件的一部分，專為法律評論編輯與法學學者設計：

| 工具 | 功能 | 使用時機 |
|------|------|----------|
| **[Zotero Perma Archiver](https://lawreview.tools/zotero)** | 在 Zotero 中儲存文獻時自動封存網址至 perma.cc | 寫作研究階段 |
| **[PermaDrop](https://lawreview.tools/permadrop/)** | 批次封存 `.docx` 中所有網址至 perma.cc | 投稿前 |
| **[SupraDrop](https://lawreview.tools/supradrop/)** | 審查所有腳注的引用格式邏輯 | 投稿前 |

建議工作流程：使用 Zotero Perma Archiver 建立研究資料庫 → 用 PermaDrop 封存剩餘網址 → 用 SupraDrop 找出引用錯誤 → 投稿。

## 授權

GNU Affero General Public License v3.0。詳見 [LICENSE](LICENSE)。

> 對外掛原始碼的修改必須依 AGPL-3.0 保持開放原始碼。附帶的 CSL 樣式（`bluebook-law-review-perma.csl`）依 CSL 專案規定，另以 <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a> 授權。

## 致謝

CSL 樣式以 <a href="http://www.zotero.org/styles/bluebook-law-review" target="_blank" rel="noopener noreferrer">Bluebook Law Review</a>（Bruce D'Arcus、Nancy Sims 及貢獻者）為基礎。定位符處理（`at X`、`¶ X`、`n.X`）參考自 Jonathan Choi 的強化版 Bluebook 樣式（2019）。並進一步針對 Bluebook 22nd edition 合規需求及 perma.cc 封存支援進行強化。

---

*本工具與《藍皮書》或 Zotero 無任何附屬或背書關係。*
