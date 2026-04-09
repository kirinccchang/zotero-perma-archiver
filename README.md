# Perma Archiver for Zotero

[繁體中文版 →](README.zh-TW.md)

**Automatically archives webpages to [perma.cc](https://perma.cc) when you save them in Zotero — keeping your citations compliant with Bluebook 22nd ed. Rule 18.2.1(d).**

Developed by [Cheng-chi "Kirin" Chang](https://kirinchang.com/), Research Fellow, U.S.-Asia Law Institute, NYU School of Law.

---

## Background

### What is Zotero?

[Zotero](https://www.zotero.org/) is a free, open-source reference manager. When you're reading an article, webpage, or court opinion in your browser, clicking the Zotero browser extension saves it to your library — title, author, date, URL, and all. Later, Zotero can automatically generate footnotes and bibliographies in any citation style. It's widely used by law students, academics, and researchers.

### What is perma.cc?

[Perma.cc](https://perma.cc) is a web archiving service created by Harvard Law School's Berkman Klein Center, purpose-built for legal citations. When you archive a URL, perma.cc takes a permanent snapshot of the page and gives it a stable, short link (e.g., `https://perma.cc/PT32-56LR`) that never changes — even if the original page is later deleted, moved, or altered.

Perma.cc is operated by Harvard Law School and a network of law libraries, and is the archiving service named in the Bluebook itself.

### The problem: link rot

Studies have found that **more than 70% of URLs cited in the Harvard Law Review** no longer link to the originally cited content. Over **50% of URLs in U.S. Supreme Court opinions** are affected. Within just one year of publication, roughly 20% of cited links are already dead; after five years, it's over 50%.

This matters because legal argument depends on the reader being able to verify the cited source. A dead link makes a citation functionally unverifiable — and the problem is permanent.

### Bluebook Rule 18.2.1(d) — what changed in the 22nd edition (2025)

The **21st edition** encouraged archiving internet sources as best practice but left it optional.

The **22nd edition (2025)** made it **mandatory**: all cited online content must be "captured and stored in a permanent setting." There are three compliant methods:

| Method | When to use |
|--------|-------------|
| Perma.cc or equivalent archive | Standard method for publicly accessible pages (blogs, news, government sites, social media) |
| Permanent URL (DOI / Handle) | If the source already has a stable permanent identifier — no additional archive needed |
| Local copy on file | For paywalled content — ends the citation with `(on file with the author)` |

The required citation format for archived web sources:

```
Author, Title, Publication (Date), URL (last visited DATE) [https://perma.cc/XXXX-XXXX].
```

Law review editors are now expected to reject citations to internet sources that lack a compliant archive link or on-file copy.

### Why this plugin exists

The manual workflow is tedious: save a page in Zotero → go to perma.cc → paste the URL → wait for the archive → copy the perma.cc link → paste it back into Zotero. For a paper with dozens of web citations, this adds up quickly.

Perma Archiver automates that entire process. The moment you save a supported item in Zotero, the plugin calls the perma.cc API in the background and writes the archive URL directly to the item — no extra steps.

---

## What it does

Every time you save a supported item in Zotero using the browser Connector, Perma Archiver will:

1. Call the perma.cc API to create an archived copy
2. Save the archive URL (`https://perma.cc/XXXX-XXXX`) to the **Place** field of your Zotero item
3. Automatically output `[https://perma.cc/XXXX-XXXX]` in your citations when using the included CSL style

**Supported item types:** Webpage · Blog Post · Newspaper Article · Magazine Article · Forum Post · Preprint

---

## Installation (2 steps)

### Step 1 — Install the Zotero plugin

1. Download [`perma-archiver_v1.2.0.xpi`](https://github.com/kirinccchang/zotero-perma-archiver/releases/download/v1.2.0/perma-archiver_v1.2.0.xpi) from the latest release
2. In Zotero 7 or 8: go to **Tools → Plugins**
3. Click the gear icon ⚙️ → **Install Add-on From File…**
4. Select the downloaded `.xpi` file
5. Restart Zotero when prompted

### Step 2 — Enter your perma.cc API key

1. Get a free API key at [https://perma.cc/settings/tools](https://perma.cc/settings/tools)
2. In Zotero: **Tools → Perma Archiver → Set API Key…**
3. Paste your key and click OK

**Optional:** Choose which perma.cc folder to save to via **Tools → Perma Archiver → Choose Save Folder…**

---

## Install the Bluebook CSL Style

To get the `[https://perma.cc/...]` bracket in your citations, install the included CSL style:

1. Download [`bluebook-law-review-KC.csl`](https://raw.githubusercontent.com/kirinccchang/zotero-perma-archiver/main/bluebook-law-review-KC.csl)
2. In Zotero: **Settings → Cite → Add from File…**
3. Select the downloaded `.csl` file

This style is based on Bluebook Law Review (22nd ed.) with perma.cc archive URL support built in.

---

## Citation output example

```
Rebecca J. Rose, The Law as Justice Gorsuch Sees It, Atlantic (Aug. 5, 2024),
https://www.theatlantic.com/ideas/archive/2024/08/interview-justice-neil-gorsuch-over-ruled/679342/
(last visited Apr. 9, 2026) [https://perma.cc/PT32-56LR].
```

---

## Requirements

- **Zotero** 7.0 or later (including 8.x)
- **perma.cc account** — free at [https://perma.cc/register](https://perma.cc/register)
  - Free accounts: 10 archives/month
  - Law school/institution accounts: higher or unlimited (check with your law library)

## Tested on

- macOS Sequoia 15.7.1 · Zotero 8.0.5

Other platforms and Zotero versions may work but have not been verified.

---

## Known limitations

- Paywalled sites (NYT, WSJ, etc.) may fail to archive — perma.cc cannot bypass paywalls. Archive these manually at perma.cc and use the `(on file with the author)` method per Rule 18.2.1(d).
- Blog posts without a publication date will have the `[perma.cc]` bracket appear before `(last visited DATE)`. Fix by adding the publication date in Zotero.

---

## Troubleshooting

**Plugin menu doesn't appear after installation:**
Try clearing the Zotero extension cache:
1. Fully quit Zotero
2. Go to `~/Library/Application Support/Zotero/Profiles/xxxxxxxx.default/`
3. Delete `extensions.json` and the `extensions` folder
4. Restart Zotero and reinstall the plugin

**Archives not appearing in citations:**
Make sure you are using the `bluebook-law-review-KC.csl` style, not the default Bluebook style.

---

## License

MIT License. See [LICENSE](LICENSE).

---

## Acknowledgments

CSL style based on [Bluebook Law Review](http://www.zotero.org/styles/bluebook-law-review) by Bruce D'Arcus, Nancy Sims, and contributors, enhanced for Bluebook 22nd edition compliance with perma.cc archiving support.
