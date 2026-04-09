# Perma Archiver for Zotero

[繁體中文版 →](README.zh-TW.md)

**Automatically archives webpages, blog posts, and news articles to [perma.cc](https://perma.cc) when saved in Zotero — keeping your citations compliant with Bluebook 22nd ed. Rule 18.2.1(d).**

Developed by [Cheng-chi "Kirin" Chang](https://kirinchang.com/), Research Fellow, U.S.-Asia Law Institute, NYU School of Law.

---

## What it does

Every time you save a supported item in Zotero using the browser Connector, Perma Archiver will:

1. Call the perma.cc API to create an archived copy
2. Save the archive URL (`https://perma.cc/XXXX-XXXX`) to your Zotero item
3. Automatically output `[https://perma.cc/XXXX-XXXX]` in your citations when using the included CSL style

**Supported item types:** Webpage · Blog Post · Newspaper Article · Magazine Article · Journal Article · Forum Post · Preprint

---

## Installation (2 steps)

### Step 1 — Install the Zotero plugin

1. Download [`perma-archiver_v1.2.0.xpi`](https://github.com/kirinccchang/zotero-perma-archiver/releases/download/v1.2.0/perma-archiver_v1.2.0) from the latest release
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

- Paywalled sites (NYT, WSJ, etc.) may fail to archive — perma.cc cannot bypass paywalls. Archive these manually at perma.cc.
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
