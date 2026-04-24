# Perma Archiver for Zotero

[繁體中文版 →](README.zh-TW.md)

<div align="center">

![Zotero](https://img.shields.io/badge/Zotero-7%20%7C%208-CC2936?style=for-the-badge&logo=zotero&logoColor=white)
![GitHub release](https://img.shields.io/github/v/release/kirinccchang/zotero-perma-archiver?style=for-the-badge)
![License](https://img.shields.io/badge/License-AGPL%20v3-blue?style=for-the-badge)

</div>

**Automatically archives any Zotero item with a URL to <a href="https://perma.cc" target="_blank" rel="noopener noreferrer">perma.cc</a> when you save it. Already have a library full of unarchived items? Select them, right-click, and archive them all at once. The `[perma.cc/...]` link appears in your Word citations automatically. Bluebook 22nd ed. Rule 18.2.1(d) compliance — no technical knowledge required.**

Developed by <a href="https://kirinchang.com/" target="_blank" rel="noopener noreferrer">Cheng-chi "Kirin" Chang</a>, Research Fellow, <a href="https://usali.org/people#kirin-chang" target="_blank" rel="noopener noreferrer">U.S.-Asia Law Institute</a>, NYU School of Law; Affiliated Researcher, AI and Future of Work Program, Emory University School of Law (former Associate Director and Academic Researcher).

---

## What is this? Why does it exist?

**<a href="https://www.zotero.org/" target="_blank" rel="noopener noreferrer">Zotero</a>** is a free tool that saves webpages and articles into a research library with one click. **<a href="https://perma.cc" target="_blank" rel="noopener noreferrer">Perma.cc</a>** is a free archiving service run by Harvard Law School that creates a permanent, unchanging copy of any webpage — so your citations never go dead. This plugin connects the two automatically.

The **Bluebook 22nd edition (2025)** made archiving internet citations **mandatory**. Studies show that over 70% of URLs cited in the Harvard Law Review no longer work. The traditional fix — manually visiting perma.cc for each URL, copying the archive link, and pasting it back into Zotero — takes five steps per item and is easy to skip.

> [!TIP]
> **In plain English:** Two workflows, both automatic:
>
> **New items:** You save a webpage in Zotero → the plugin archives it to perma.cc in the background → your Bluebook citations automatically include the `[perma.cc/...]` bracket. No extra steps.
>
> **Existing library:** Already have hundreds of unarchived items? Select them all, right-click, choose **Archive to Perma.cc** — done. The plugin works through your backlog and tags any failures so nothing slips through.

> [!NOTE]
> **Want the full background?** Expand below for a detailed explanation of link rot, how perma.cc works, and exactly what Rule 18.2.1(d) requires.

<details>
<summary>▶ What is Zotero? What is perma.cc? Why does this exist? (click to expand)</summary>

### What is Zotero?

<a href="https://www.zotero.org/" target="_blank" rel="noopener noreferrer">Zotero</a> is a free, open-source reference manager. When you're reading an article, webpage, or court opinion in your browser, clicking the Zotero browser extension saves it to your library — title, author, date, URL, and all. Later, Zotero can automatically generate footnotes and bibliographies in any citation style.

### What is perma.cc?

<a href="https://perma.cc" target="_blank" rel="noopener noreferrer">Perma.cc</a> is a web archiving service created by Harvard Law School's Berkman Klein Center, purpose-built for legal citations. It creates a permanent, immutable snapshot of a webpage at the moment of capture and stores it at a stable short URL (e.g., `https://perma.cc/PT32-56LR`) that never changes — even if the original page is later deleted or altered. It is the archiving service named in the Bluebook itself.

### The problem: link rot

Studies have found that **more than 70% of URLs cited in the Harvard Law Review** no longer link to the originally cited content. Over **50% of URLs in U.S. Supreme Court opinions** are affected. Within just one year of publication, roughly 20% of cited links are already dead; after five years, it's over 50%.

This matters because legal argument depends on the reader being able to verify the cited source. A dead link makes a citation functionally unverifiable — and the problem is permanent.

### What changed in the 22nd edition (2025)?

The **21st edition** encouraged archiving internet sources as best practice but left it optional.

The **22nd edition (2025)** made it **mandatory**: all cited online content must be "captured and stored in a permanent setting." There are three compliant methods:

| Method | When to use |
|--------|-------------|
| Perma.cc or equivalent archive | Standard method for publicly accessible pages (blogs, news, government sites) |
| Permanent URL (DOI / Handle) | If the source already has a stable permanent identifier — no archive needed |
| Local copy `(on file with the author)` | For paywalled content |

Law review editors are now expected to reject citations to internet sources that lack a compliant archive link.

</details>

---

## Before You Start

You will need:

- [ ] **Zotero** installed on your computer → <a href="https://www.zotero.org/download/" target="_blank" rel="noopener noreferrer">Download free at zotero.org</a>
- [ ] **A perma.cc account** → <a href="https://perma.cc/register" target="_blank" rel="noopener noreferrer">Register free at perma.cc</a> (takes 2 minutes)
- [ ] **A perma.cc API key** → after logging in, go to <a href="https://perma.cc/settings/tools" target="_blank" rel="noopener noreferrer">perma.cc/settings/tools</a>. If you have never generated a key before, click the **"Generate an API key"** button — the key will appear on that page. Copy it.

> [!IMPORTANT]
> **New individual accounts start with only 10 free trial links.** After the trial, you need either an institutional account or a paid plan to keep archiving. Most law school libraries provide perma.cc access free of charge to students, faculty, and journal staff — check with your law librarian before signing up individually. You can check your remaining links at any time at <a href="https://perma.cc/settings/tools" target="_blank" rel="noopener noreferrer">perma.cc/settings/tools</a>.

---

## Installation

### Step 1 — Download and install the plugin file

1. Click here to download: **<a href="https://github.com/kirinccchang/zotero-perma-archiver/releases/download/v1.3.2/perma-archiver_v1.3.2.xpi" target="_blank" rel="noopener noreferrer">perma-archiver_v1.3.2.xpi</a>**
   - Your browser may warn you about downloading a `.xpi` file — this is normal. Allow the download.
   - Save it somewhere easy to find (e.g., your Desktop).

2. Open **Zotero** on your computer.

3. In the menu bar at the top of the screen, click **Tools**.

4. In the dropdown menu, click **Plugins**.

5. In the Plugins window, look for a small **gear icon ⚙️** in the upper-right corner. Click it.

6. Click **Install Add-on From File…**

7. A file browser will open. Navigate to where you saved the `.xpi` file, select it, and click **Open**.

8. When asked to restart Zotero, click **Restart Now**.

> [!NOTE]
> After restarting, you should see **Perma Archiver** listed under **Tools** in the menu bar. If you don't, see [Troubleshooting](#troubleshooting) below.

---

### Step 2 — Enter your perma.cc API key

1. In Zotero, click **Tools** in the menu bar.
2. Hover over **Perma Archiver**.
3. Click **Set API Key…**
4. A small dialog box will appear. Paste your API key and click **OK**.
5. The plugin will immediately try to connect to perma.cc and show your folders — this confirms your key is working.

> [!IMPORTANT]
> The plugin will not archive anything until you complete this step. Your API key is what connects the plugin to your perma.cc account.
>
> **If a folder list does not appear after entering the key**, the key was not accepted. Double-check that you copied it correctly from <a href="https://perma.cc/settings/tools" target="_blank" rel="noopener noreferrer">perma.cc/settings/tools</a>. If you have not generated a key yet, click the **"Generate an API key"** button on that page first.

**Optional — Choose a save folder:**

By default, all archives are saved to your perma.cc **Personal Links** folder. After entering your API key, a folder selection dialog will open automatically. You can also access it later via **Tools → Perma Archiver → Choose Save Folder…**

> [!TIP]
> Law school accounts often have shared organizational folders set up by the library. Ask your law librarian if your institution has a dedicated perma.cc folder for student journal work.

---

### Step 3 — Install the Bluebook citation style (optional — for Word users)

> [!NOTE]
> **Steps 1 and 2 are all you need.** Once the plugin is installed and your API key is entered, the perma.cc link is saved directly into your Zotero item — you can see it there, copy it manually, or use it however you like.
>
> Step 3 is only needed if you use **Zotero's Word plugin** to insert citations into Microsoft Word or Google Docs. If you do, this small style file makes the `[https://perma.cc/...]` bracket appear in your footnotes automatically.
>
> Zotero's Word plugin is included with Zotero and installs automatically into Word. If you have not set it up yet, see <a href="https://www.zotero.org/support/word_processor_plugin_usage" target="_blank" rel="noopener noreferrer">Zotero's word processor plugin documentation</a>.

This step downloads a small style file that tells Zotero how to format your Bluebook footnotes — no technical knowledge needed.

1. Click here to download: **<a href="https://raw.githubusercontent.com/kirinccchang/zotero-perma-archiver/main/bluebook-law-review-perma.csl" target="_blank" rel="noopener noreferrer">bluebook-law-review-perma.csl</a>**
   - If your browser opens it as text instead of downloading, right-click the link and choose **Save Link As…**

2. In Zotero, open **Settings** (on Mac: **Zotero → Settings**; on Windows: **Edit → Preferences**).

3. Click the **Cite** tab.

4. Under "Citation Styles," click the **+** button or **Add from File…**

5. Select the `.csl` file you just downloaded and click **Open**.

6. When inserting citations in Word or Google Docs, choose **Bluebook Law Review (perma.cc)** as your citation style.

> [!TIP]
> Once installed, the style works automatically. Just use Zotero's "Add/Edit Citation" as you normally would — the perma.cc link will appear on its own.

---

## What happens after setup

### Automatic archiving — new saves

Once the plugin is installed and your API key is entered, **every new save is handled automatically**:

1. You click the Zotero browser extension icon to save any item with a URL
2. The plugin calls perma.cc in the background (takes a few seconds)
3. The perma.cc link is saved directly into your Zotero item. To see it: click the item in Zotero, then look at the **Info** tab on the right side panel.
   - For most item types (news articles, web pages, government documents, etc.), it appears in the **Place** field.
   - For blog posts and forum posts, which do not have a Place field, it is appended to the end of the **URL** field in brackets: `https://original-url [https://perma.cc/XXXX-XXXX]`.

If you use Zotero's Word plugin (Step 3), citations will automatically include the perma.cc bracket:

```
Rebecca J. Rose, The Law as Justice Gorsuch Sees It, Atlantic (Aug. 5, 2024),
https://www.theatlantic.com/ideas/archive/2024/08/interview-justice-neil-gorsuch-over-ruled/679342/
(last visited Apr. 9, 2026) [https://perma.cc/PT32-56LR].
```

### Batch archiving — your existing library

Already have items in Zotero that were saved before you installed this plugin? You can archive them all retroactively:

1. Select any items in your Zotero library (use **⌘A** or **Ctrl+A** to select all, or hold **⌘/Ctrl** to pick specific ones)
2. Right-click the selection
3. Choose **Archive to Perma.cc**
4. Confirm — the plugin works through each item and shows a summary when done

Items that fail (e.g., paywalled pages) are automatically tagged **`perma-failed`** — a colored label that appears in your Zotero library so you can find and handle them manually. If you retry and it succeeds, the tag is removed automatically.

**Works with any Zotero item that has a URL** — webpages, blog posts, newspaper articles, reports, government documents, and more.

> [!IMPORTANT]
> **Check your link quota before running a batch archive on a large library.** Individual trial accounts have only **10 links total** — if you run out mid-batch, remaining items will be tagged `perma-failed`. Institutional accounts (through law school libraries) typically have unlimited links. Check your remaining quota at <a href="https://perma.cc/settings/tools" target="_blank" rel="noopener noreferrer">perma.cc/settings/tools</a> before starting.

---

## Known limitations

> [!WARNING]
> **A perma.cc link is not a guarantee the content was captured.** If the original page was already unavailable, returning an error, or behind a paywall at the moment of capture, perma.cc may still issue a link — but the archived snapshot will be empty or show a "Capture Failed" error. Always verify your perma.cc links before submitting by clicking each one and confirming the content appears correctly.
>
> **If a capture failed**, you can fix it manually without losing the link: open the perma.cc link, click **"Show record details"**, then use **"Upload file"** to replace the failed capture with a screenshot (JPG, PNG, GIF) or a PDF of the page — up to 200 MB. This lets you preserve the same perma.cc URL while supplying a working snapshot.

> [!WARNING]
> **Paywalled sites** (NYT, WSJ, SSRN login-required pages, etc.) may fail to archive — perma.cc cannot bypass paywalls. For these, archive manually at perma.cc and add `(on file with the author)` to your citation per Rule 18.2.1(d).

> [!NOTE]
> Blog posts without a publication date will show the `[perma.cc]` bracket slightly out of order in the citation. Fix by manually entering the publication date in the Zotero item.

---

## Troubleshooting

<details>
<summary>Plugin menu doesn't appear after installation</summary>

Try clearing the Zotero extension cache:

1. Fully quit Zotero (make sure it's not just minimized)
2. Navigate to your Zotero profile folder:
   - **Mac:** Open Finder, press **⌘ Shift G**, and paste: `~/Library/Application Support/Zotero/Profiles/`
   - **Windows:** Open File Explorer, click the address bar at the top, and paste: `%APPDATA%\Zotero\Zotero\Profiles\`
3. Open the folder with a long name ending in `.default`
4. Delete the file `extensions.json` and the folder named `extensions`
5. Restart Zotero and reinstall the plugin from Step 1

</details>

<details>
<summary>Archives not appearing in citations</summary>

Make sure you selected **Bluebook Law Review (perma.cc)** as your citation style — not the default "Bluebook Law Review" style that came with Zotero. Only the perma.cc version includes the perma.cc bracket.

</details>

<details>
<summary>The plugin is running but nothing is being archived</summary>

Check that:
1. You completed Step 2 (entered your API key)
2. The item has a URL field (the plugin archives any item with a URL)
3. Archiving is enabled: **Tools → Perma Archiver → Enable** should be checked

</details>

---

## Tested on

- macOS Sequoia 15.7.1 · Zotero 8.0.5
- Windows 11 Enterprise (26200.8037) · Zotero 8.0.4
- Windows 11 Enterprise (26200.8037) · Zotero 7.0.32

Other platforms and Zotero versions may work but have not been verified.

---

## Part of lawreview.tools

The Zotero Perma Archiver is one tool in the **[lawreview.tools](https://lawreview.tools)** suite — a free, open-source collection of Bluebook tools for law review editors and legal scholars:

| Tool | What it does | When to use it |
|------|-------------|----------------|
| **[Zotero Perma Archiver](https://lawreview.tools/zotero)** | Auto-archives URLs to perma.cc as you save items in Zotero | While writing |
| **[PermaDrop](https://lawreview.tools/permadrop/)** | Batch-archives all URLs in a .docx to perma.cc | Before submission |
| **[SupraDrop](https://lawreview.tools/supradrop/)** | Audits citation logic across all footnotes | Before submission |
| **[cite.review](https://cite.review)** | Verify citations in legal writing: catch hallucinated authorities before filing | Before submission |

Typical workflow: Zotero Perma Archiver while researching → PermaDrop to archive remaining URLs → SupraDrop to catch citation errors → cite.review to verify citations → submit.

## License

GNU Affero General Public License v3.0. See [LICENSE](LICENSE).

> Modifications to the plugin source files must remain open source under AGPL-3.0. The included CSL style (`bluebook-law-review-perma.csl`) is separately licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a> as required by the CSL project.

## Acknowledgments

CSL style based on <a href="http://www.zotero.org/styles/bluebook-law-review" target="_blank" rel="noopener noreferrer">Bluebook Law Review</a> by Bruce D'Arcus, Nancy Sims, and contributors. Locator handling (`at X`, `¶ X`, `n.X`) draws on Jonathan Choi's enhanced Bluebook style (2019). Further enhanced for Bluebook 22nd edition compliance and perma.cc archiving support.

---

*Not affiliated with or endorsed by The Bluebook, Zotero, or perma.cc.*
