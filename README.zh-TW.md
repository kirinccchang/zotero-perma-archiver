# Perma Archiver for Zotero

[English →](README.md)

<div align="center">

![Zotero](https://img.shields.io/badge/Zotero-7%20%7C%208-CC2936?style=for-the-badge&logo=zotero&logoColor=white)
![GitHub release](https://img.shields.io/github/v/release/kirinccchang/zotero-perma-archiver?style=for-the-badge)
![License](https://img.shields.io/badge/License-AGPL%20v3-blue?style=for-the-badge)

</div>

**在 Zotero 中儲存網頁時，自動封存到 [perma.cc](https://perma.cc)，並將 `[perma.cc/...]` 連結自動加入 Word 引用中。完全符合 Bluebook 22nd ed. Rule 18.2.1(d) 規範，無需額外操作。**

作者：[張正麒（Cheng-chi "Kirin" Chang）](https://kirinchang.com/)，美國紐約大學法學院「[亞美法研究所](https://usali.org/people#kirin-chang)」專任研究員，同時兼任美國埃默里大學法學院「人工智慧與未來工作計畫」附屬研究員，曾任該計畫副主任暨學術研究員。專長領域包括科技與法律、隱私權、智慧財產權、資安、國際法、人工智慧與法律、契約法、公司法、企業社會責任與各類新興科技議題。

---

> [!TIP]
> **一句話說清楚：** 你在 Zotero 存一個網頁 → 外掛自動在 perma.cc 建立永久封存副本 → 之後用 Zotero 產生引用時，`[perma.cc/...]` 連結會自動出現，完全符合 Bluebook 22nd ed. 規定。不需要任何額外操作。

---

## 這是什麼？為什麼需要它？

> [!NOTE]
> **不熟悉 Zotero 或 perma.cc？** 展開下方說明，了解這些工具是什麼、網路引用為何會失效，以及 Bluebook 第 22 版規定了什麼。

<details>
<summary>▶ Zotero 是什麼？perma.cc 是什麼？這個外掛為何存在？（點此展開）</summary>

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

法律評論的編輯現在應拒絕接受未附合規封存連結或本地存檔的網路引用。

### 為什麼需要這個外掛？

傳統手動流程相當繁瑣：在 Zotero 存網頁 → 前往 perma.cc → 貼上網址 → 等待封存 → 複製 perma.cc 連結 → 貼回 Zotero。一篇論文若有數十筆網路引用，這個過程非常耗時。

Perma Archiver 將整個流程自動化。只要用 Zotero 儲存支援的條目，外掛就會在背景呼叫 perma.cc API，並自動將封存網址寫入條目——完全不需要額外操作。

</details>

---

## 開始之前

你需要準備：

- [ ] 電腦上已安裝 **Zotero** → [在 zotero.org 免費下載](https://www.zotero.org/download/)
- [ ] **perma.cc 帳號** → [在 perma.cc 免費註冊](https://perma.cc/register)（約 2 分鐘；你的法學院圖書館可能已有機構帳號）
- [ ] **perma.cc API 金鑰** → 登入後前往 [perma.cc/settings/tools](https://perma.cc/settings/tools)，複製頁面上顯示的金鑰

---

## 安裝步驟

### 步驟一：下載並安裝外掛檔案

1. 點此下載：**[perma-archiver_v1.2.6.xpi](https://github.com/kirinccchang/zotero-perma-archiver/releases/download/v1.2.6/perma-archiver_v1.2.6.xpi)**
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

### 步驟二：輸入 perma.cc API 金鑰

1. 在 Zotero 中，點選選單列的 **Tools（工具）**。
2. 將滑鼠移到 **Perma Archiver** 上。
3. 點選 **Set API Key…**
4. 在跳出的對話框中貼上你的 API 金鑰，點 **OK**。

> [!IMPORTANT]
> 完成此步驟前，外掛不會封存任何內容。API 金鑰是外掛連接你的 perma.cc 帳號的憑證，不可略過。

**選用——選擇儲存資料夾：**

預設情況下，所有封存會存入 perma.cc 的 **Personal Links** 資料夾。若想將封存分類到特定資料夾（例如按期刊或專案分類）：

1. 在 Zotero 中，前往 **Tools → Perma Archiver → Choose Save Folder…**
2. 畫面會列出你的 perma.cc 資料夾清單，選擇你想使用的資料夾。
3. 點 **OK**——之後所有封存都會存入該資料夾。

> [!TIP]
> 法學院帳號通常由圖書館預先建立了共用組織資料夾。如果你是期刊編輯或研究助理，可以詢問法學院圖書館員是否有機構專用的 perma.cc 資料夾。

---

### 步驟三：安裝 Bluebook CSL 引用樣式

此步驟讓 Zotero 產生引用時自動加上 Bluebook Rule 18.2.1(d) 要求的 `[https://perma.cc/...]` 括號。

1. 點此下載：**[bluebook-law-review-perma.csl](https://raw.githubusercontent.com/kirinccchang/zotero-perma-archiver/main/bluebook-law-review-perma.csl)**
   - 若瀏覽器將其顯示為純文字而非下載，請右鍵點擊連結，選擇**另存連結為（Save Link As…）**。

2. 在 Zotero 中開啟**設定（Settings）**（Mac：**Zotero → Settings**；Windows：**Edit → Preferences**）。

3. 點選 **Cite（引用）** 分頁。

4. 在「Citation Styles」下方，點選 **+** 按鈕或 **Add from File…（從檔案新增）**。

5. 選取剛才下載的 `.csl` 檔案，點 **Open（開啟）**。

6. 之後在 Word 中插入引用或產生參考書目時，選擇 **Bluebook Law Review (perma.cc)** 作為引用樣式。

> [!TIP]
> 安裝完成後，樣式會自動運作。只要照常在 Word 中使用 Zotero 的「Add/Edit Citation」功能，perma.cc 連結就會自動出現，不需要任何額外操作。

---

## 設定完成後的運作方式

安裝外掛並輸入 API 金鑰後，**一切都是自動的**：

1. 你點一下 Zotero 瀏覽器擴充功能圖示，儲存一個網頁
2. 外掛在背景呼叫 perma.cc（需要幾秒鐘）
3. 封存網址自動寫入你的 Zotero 條目
4. 在 Word 中插入引用時，輸出如下：

```
Rebecca J. Rose, The Law as Justice Gorsuch Sees It, Atlantic (Aug. 5, 2024),
https://www.theatlantic.com/ideas/archive/2024/08/interview-justice-neil-gorsuch-over-ruled/679342/
(last visited Apr. 9, 2026) [https://perma.cc/PT32-56LR].
```

**支援的條目類型：** 網頁（Webpage）· 部落格文章（Blog Post）· 報紙文章（Newspaper Article）· 雜誌文章（Magazine Article）· 論壇文章（Forum Post）· 預印本（Preprint）

---

## 已知限制

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
2. 在 Mac 上開啟 Finder，按 **⌘ Shift G**，貼上：`~/Library/Application Support/Zotero/Profiles/`
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
2. 儲存的條目類型有受支援（網頁、部落格文章、報紙文章、雜誌文章、論壇文章、預印本）
3. 封存功能已開啟：**Tools → Perma Archiver → Enable** 應為勾選狀態

</details>

---

## 測試環境

- macOS Sequoia 15.7.1 · Zotero 8.0.5

其他平台及 Zotero 版本或可正常運作，但尚未經過驗證。

---

## 授權

GNU Affero General Public License v3.0。詳見 [LICENSE](LICENSE)。

> 對外掛原始碼的修改必須依 AGPL-3.0 保持開放原始碼。附帶的 CSL 樣式（`bluebook-law-review-perma.csl`）依 CSL 專案規定，另以 [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) 授權。

## 致謝

CSL 樣式以 Bruce D'Arcus、Nancy Sims 及貢獻者的 [Bluebook Law Review](http://www.zotero.org/styles/bluebook-law-review) 為基礎，針對 Bluebook 22nd edition 合規需求及 perma.cc 封存支援進行強化。
