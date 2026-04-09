# Perma Archiver for Zotero

[繁體中文版 →](README.zh-TW.md)

<div align="center">

![Zotero](https://img.shields.io/badge/Zotero-7%20%7C%208-CC2936?style=for-the-badge&logo=zotero&logoColor=white)
![GitHub release](https://img.shields.io/github/v/release/kirinccchang/zotero-perma-archiver?style=for-the-badge)
![License](https://img.shields.io/github/license/kirinccchang/zotero-perma-archiver?style=for-the-badge)

</div>

**Automatically archives webpages to [perma.cc](https://perma.cc) when you save them in Zotero — keeping your citations compliant with Bluebook 22nd ed. Rule 18.2.1(d).**

Developed by [Cheng-chi "Kirin" Chang](https://kirinchang.com/), Research Fellow, U.S.-Asia Law Institute, NYU School of Law.

---

> [!TIP]
> **In plain English:** You save a webpage in Zotero → this plugin automatically creates a permanent archived copy at perma.cc → your Bluebook citations automatically include the `[perma.cc/...]` link required by the 22nd edition. No extra steps.

---

## What is this? Why does it exist?

> [!NOTE]
> **New to Zotero or perma.cc?** Expand the section below for a plain-English explanation of what these tools are, why citations rot, and what the 22nd edition requires.

<details>
<summary>▶ What is Zotero? What is perma.cc? Why does this exist? (click to expand)</summary>

### What is Zotero?

[Zotero](https://www.zotero.org/) is a free, open-source reference manager. When you're reading an article, webpage, or court opinion in your browser, clicking the Zotero browser extension saves it to your library — title, author, date, URL, and all. Later, Zotero can automatically generate footnotes and bibliographies in any citation style.

### What is perma.cc?

[Perma.cc](https://perma.cc) is a web archiving service created by Harvard Law School's Berkman Klein Center, purpose-built for legal citations. It creates a permanent, immutable snapshot of a webpage at the moment of capture and stores it at a stable short URL (e.g., `https://perma.cc/PT32-56LR`) that never changes — even if the original page is later deleted or altered. It is the archiving service named in the Bluebook itself.

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

- [ ] **Zotero** installed on your computer → [Download free at zotero.org](https://www.zotero.org/download/)
- [ ] **A perma.cc account** → [Register free at perma.cc](https://perma.cc/register) (takes 2 minutes; your law library may already have an institutional account)
- [ ] **A perma.cc API key** → after logging in, go to [perma.cc/settings/tools](https://perma.cc/settings/tools) and copy the key shown there

---

## Installation

### Step 1 — Download and install the plugin file

1. Click here to download: **[perma-archiver_v1.2.0.xpi](https://github.com/kirinccchang/zotero-perma-archiver/releases/download/v1.2.0/perma-archiver_v1.2.0.xpi)**
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

> [!IMPORTANT]
> The plugin will not archive anything until you complete this step. Your API key is what connects the plugin to your perma.cc account.

**Optional — Choose a save folder:**

By default, all archives are saved to your perma.cc **Personal Links** folder. If you want them organized into a specific folder (e.g., a folder for a particular journal or project):

1. In Zotero, go to **Tools → Perma Archiver → Choose Save Folder…**
2. A list of your perma.cc folders will appear. Select the one you want.
3. Click **OK** — all future archives will be saved there.

> [!TIP]
> Law school accounts often have shared organizational folders set up by the library. Ask your law librarian if your institution has a dedicated perma.cc folder for student journal work.

---

### Step 3 — Install the Bluebook CSL citation style

This step makes your Zotero citations automatically include the `[https://perma.cc/...]` bracket required by Bluebook Rule 18.2.1(d).

1. Click here to download: **[bluebook-law-review-perma.csl](https://raw.githubusercontent.com/kirinccchang/zotero-perma-archiver/main/bluebook-law-review-perma.csl)**
   - If your browser opens it as text instead of downloading, right-click the link and choose **Save Link As…**

2. In Zotero, open **Settings** (on Mac: **Zotero → Settings**; on Windows: **Edit → Preferences**).

3. Click the **Cite** tab.

4. Under "Citation Styles," click the **+** button or **Add from File…**

5. Select the `.csl` file you just downloaded and click **Open**.

6. When creating a bibliography or inserting citations in Word, choose **Bluebook Law Review (perma.cc)** as your citation style.

> [!TIP]
> Once installed, the style works automatically. Just use Zotero's "Add/Edit Citation" in Word as you normally would — the perma.cc link will appear on its own.

---

## What happens after setup

Once the plugin is installed and your API key is entered, **everything is automatic**:

1. You click the Zotero browser extension icon to save a webpage
2. The plugin calls perma.cc in the background (takes a few seconds)
3. The archived URL is saved to your Zotero item
4. When you insert a citation in Word, it looks like this:

```
Rebecca J. Rose, The Law as Justice Gorsuch Sees It, Atlantic (Aug. 5, 2024),
https://www.theatlantic.com/ideas/archive/2024/08/interview-justice-neil-gorsuch-over-ruled/679342/
(last visited Apr. 9, 2026) [https://perma.cc/PT32-56LR].
```

**Supported item types:** Webpage · Blog Post · Newspaper Article · Magazine Article · Forum Post · Preprint

---

## Known limitations

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
2. On your Mac, open Finder and press **⌘ Shift G**, then paste: `~/Library/Application Support/Zotero/Profiles/`
3. Open the folder with a long name ending in `.default`
4. Delete the file `extensions.json` and the folder named `extensions`
5. Restart Zotero and reinstall the plugin from Step 1

</details>

<details>
<summary>Archives not appearing in citations</summary>

Make sure you selected **Bluebook Law Review (perma.cc)** as your citation style — not the default "Bluebook Law Review" style that came with Zotero. Only the KC version includes the perma.cc bracket.

</details>

<details>
<summary>The plugin is running but nothing is being archived</summary>

Check that:
1. You completed Step 2 (entered your API key)
2. The item type is supported (Webpage, Blog Post, Newspaper Article, Magazine Article, Forum Post, or Preprint)
3. Archiving is enabled: **Tools → Perma Archiver → Enable** should be checked

</details>

---

## Tested on

- macOS Sequoia 15.7.1 · Zotero 8.0.5

Other platforms and Zotero versions may work but have not been verified.

---

## License

MIT License. See [LICENSE](LICENSE).

## Acknowledgments

CSL style based on [Bluebook Law Review](http://www.zotero.org/styles/bluebook-law-review) by Bruce D'Arcus, Nancy Sims, and contributors, enhanced for Bluebook 22nd edition compliance with perma.cc archiving support.
