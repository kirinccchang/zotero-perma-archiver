/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Perma Archiver — bootstrap.js v1.2.9
 * Menu: Set API Key, Choose Folder, separator, Enable/Disable, separator, About
 */
"use strict";

var _rootURI  = null;
var _version  = null;

const PREF_APIKEY = "extensions.perma-archiver.apiKey";
const MENU_ID     = "perma-archiver-menu";

function install(data, reason) {}
function uninstall(data, reason) {}

function startup({ id, version, rootURI }, reason) {
  _rootURI = rootURI;
  _version = version;

  Services.console.logStringMessage("Perma Archiver v" + version + ": startup() called");

  const win = Services.wm.getMostRecentWindow("navigator:browser");
  if (!win) return;

  try {
    Services.scriptloader.loadSubScript(rootURI + "content.js?" + Date.now(), win);
    win._permaArchiver.initNotifier(id, version);
    Services.console.logStringMessage("Perma Archiver: content.js loaded ✓");
  } catch(e) {
    Services.console.logStringMessage("Perma Archiver: startup error: " + e);
  }

  win.setTimeout(() => {
    _injectMenu(win);
    _injectContextMenu(win);
    if (!_getKey()) _promptFirstRun(win);
  }, 1000);
}

function shutdown(data, reason) {
  const win = Services.wm.getMostRecentWindow("navigator:browser");
  if (win && win._permaArchiver) win._permaArchiver.shutdownNotifier();
}

function onMainWindowLoad({ window }) {
  Services.console.logStringMessage("Perma Archiver: onMainWindowLoad() called");
  window.setTimeout(() => {
    _injectMenu(window);
    _injectContextMenu(window);
    if (!_getKey()) _promptFirstRun(window);
  }, 800);
}

function onMainWindowUnload({ window }) {
  const doc = window.document;
  ["perma-archiver-menu", "perma-archiver-ctx-sep", "perma-archiver-ctx-item"]
    .forEach(id => { const el = doc.getElementById(id); if (el) el.remove(); });
}

// ── Menu ───────────────────────────────────────────────────

function _injectMenu(window) {
  try {
    const doc  = window.document;
    const root = doc.getElementById("menu_ToolsPopup");
    if (!root) { window.setTimeout(() => _injectMenu(window), 1000); return; }
    if (doc.getElementById(MENU_ID)) return;

    const menu = doc.createXULElement("menu");
    menu.id    = MENU_ID;
    menu.setAttribute("label", "Perma Archiver");

    const popup = doc.createXULElement("menupopup");

    // Set API Key
    const itemKey = doc.createXULElement("menuitem");
    itemKey.setAttribute("label", "Set API Key…");
    itemKey.addEventListener("command", () => _promptSetKey(window));

    // Choose Folder
    const itemFolder = doc.createXULElement("menuitem");
    itemFolder.setAttribute("label", "Choose Save Folder…");
    itemFolder.addEventListener("command", () => {
      const key = _getKey();
      if (!key) {
        Services.prompt.alert(window, "Perma Archiver",
          "Please set your API key first.");
        return;
      }
      // Call async folder picker
      if (window._permaArchiver) {
        window._permaArchiver.promptFolderSelect(window, key);
      }
    });

    // Enable / Disable
    const itemToggle = doc.createXULElement("menuitem");
    itemToggle.id    = MENU_ID + "-toggle";
    itemToggle.setAttribute("label", _isOn() ? "Disable Auto-Archive" : "Enable Auto-Archive");
    itemToggle.addEventListener("command", () => {
      const next = !_isOn();
      _setOn(next);
      itemToggle.setAttribute("label", next ? "Disable Auto-Archive" : "Enable Auto-Archive");
      Services.prompt.alert(window, "Perma Archiver",
        next ? "Auto-archive enabled ✓" : "Auto-archive disabled.");
    });

    // About
    const itemAbout = doc.createXULElement("menuitem");
    itemAbout.setAttribute("label", "About — Kirin Chang");
    itemAbout.addEventListener("command", () => {
      Zotero.launchURL("https://kirinchang.com/");
    });

    popup.appendChild(itemKey);
    popup.appendChild(itemFolder);
    popup.appendChild(doc.createXULElement("menuseparator"));
    popup.appendChild(itemToggle);
    popup.appendChild(doc.createXULElement("menuseparator"));
    popup.appendChild(itemAbout);
    menu.appendChild(popup);
    root.appendChild(menu);
    Services.console.logStringMessage("Perma Archiver: menu injected ✓");
  } catch(e) {
    Services.console.logStringMessage("Perma Archiver: _injectMenu error: " + e);
  }
}

// ── Context menu (right-click on items) ────────────────────

function _injectContextMenu(window) {
  try {
    const doc  = window.document;
    const menu = doc.getElementById("zotero-itemmenu");
    if (!menu) return;
    if (doc.getElementById("perma-archiver-ctx-item")) return;

    const sep = doc.createXULElement("menuseparator");
    sep.id = "perma-archiver-ctx-sep";

    const item = doc.createXULElement("menuitem");
    item.id = "perma-archiver-ctx-item";
    item.setAttribute("label", "Archive to Perma.cc");
    item.addEventListener("command", () => {
      if (window._permaArchiver) window._permaArchiver.batchArchive(window);
    });

    menu.appendChild(sep);
    menu.appendChild(item);
  } catch(e) {
    Services.console.logStringMessage("Perma Archiver: _injectContextMenu error: " + e);
  }
}

// ── Dialogs ────────────────────────────────────────────────

function _promptFirstRun(window) {
  Services.prompt.alert(window,
    "Welcome to Perma Archiver 📎",
    "Auto-archives webpages, blog posts, news & more to perma.cc.\n" +
    "(Bluebook 22nd ed. Rule 18.2.1(d))\n\n" +
    "Types: webpage · blog · news · magazine · forum · preprint\n\n" +
    "Step 1: Tools → Perma Archiver → Set API Key…\n" +
    "Step 2: Tools → Perma Archiver → Choose Save Folder…\n" +
    "Free key: https://perma.cc/settings/tools"
  );
  _promptSetKey(window);
}

function _promptSetKey(window) {
  const result = { value: _getKey() };
  const ok = Services.prompt.prompt(window,
    "Perma Archiver \u2014 API Key",
    "Enter your perma.cc API key.\n\n" +
    "Get your key at: https://perma.cc/settings/tools\n" +
    "(If you have not generated one yet, click \u201cGenerate an API key\u201d on that page.)",
    result, null, { value: false }
  );
  if (ok && result.value && result.value.trim()) {
    const key = result.value.trim();
    _setKey(key);
    _setOn(true);
    // Immediately validate by trying to load folders
    if (window._permaArchiver) {
      window._permaArchiver.promptFolderSelect(window, key);
    } else {
      Services.prompt.alert(window, "Perma Archiver",
        "\u2713 API key saved!\n\nNext: Tools \u2192 Perma Archiver \u2192 Choose Save Folder\u2026\n" +
        "to verify your key and pick which folder to use.");
    }
  }
}

// ── Prefs ──────────────────────────────────────────────────

function _getKey() {
  try { return Services.prefs.getStringPref(PREF_APIKEY, ""); }
  catch(e) { return ""; }
}
function _setKey(v) {
  try { Services.prefs.setStringPref(PREF_APIKEY, v); }
  catch(e) {}
}
function _isOn() {
  try { return Services.prefs.getBoolPref("extensions.perma-archiver.enabled", true); }
  catch(e) { return true; }
}
function _setOn(v) {
  try { Services.prefs.setBoolPref("extensions.perma-archiver.enabled", v); }
  catch(e) {}
}
