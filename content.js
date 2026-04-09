/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * content.js — loaded into WINDOW scope via loadSubScript(url, window)
 * Zotero IS available here.
 */
"use strict";

if (!window._permaArchiver) {
  window._permaArchiver = {

    _notifierID: null,

    PREF_APIKEY  : "extensions.perma-archiver.apiKey",
    PREF_ON      : "extensions.perma-archiver.enabled",
    PREF_FOLDER  : "extensions.perma-archiver.folderID",
    PERMA_API    : "https://api.perma.cc/v1/archives/",
    PERMA_FOLDERS: "https://api.perma.cc/v1/folders/",
    MENU_ID      : "perma-archiver-menu",

    ARCHIVE_TYPES: new Set([
      "webpage", "blogPost", "newspaperArticle",
      "magazineArticle", "forumPost", "preprint",
    ]),

    // ── Init ────────────────────────────────────────────

    initNotifier(id, version) {
      try {
        this._notifierID = Zotero.Notifier.registerObserver(
          { notify: (...a) => this._onNotify(...a) },
          ["item"], id
        );
        Zotero.log("Perma Archiver v" + version + ": notifier ready ✓");
      } catch(e) {
        Zotero.log("Perma Archiver: initNotifier error: " + e);
      }
    },

    shutdownNotifier() {
      if (this._notifierID) {
        try { Zotero.Notifier.unregisterObserver(this._notifierID); }
        catch(e) {}
        this._notifierID = null;
      }
    },

    // ── Notifier ─────────────────────────────────────────

    async _onNotify(event, type, ids) {
      if (event !== "add" || type !== "item") return;
      if (!this._isOn()) return;
      const key = this._getKey();
      if (!key) return;
      for (const id of ids) {
        try { await this._processItem(id, key); }
        catch(e) { Zotero.log("Perma Archiver: processItem error: " + e); }
      }
    },

    async _processItem(itemID, apiKey) {
      const item = await Zotero.Items.getAsync(itemID);
      if (!item || !this.ARCHIVE_TYPES.has(item.itemType)) return;

      const url = item.getField("url") || "";
      if (!url) return;

      const place = item.getField("place") || "";
      if (place.toLowerCase().includes("perma.cc")) return;
      const extra = item.getField("extra") || "";
      if (extra.toLowerCase().includes("perma.cc")) return;

      Zotero.log("Perma Archiver: archiving [" + item.itemType + "] " + url);
      await Zotero.Promise.delay(1500);

      const permaUrl = await this._callPerma(url, apiKey);
      if (!permaUrl) return;

      item.setField("place", permaUrl);
      await item.saveTx();
      Zotero.log("Perma Archiver: done → " + permaUrl);

      try {
        const win = Zotero.getMainWindow();
        if (win && win.ZoteroPane) {
          win.ZoteroPane.setItemsPaneMessage("Perma Archiver: archived ✓");
          win.setTimeout(() => win.ZoteroPane.clearItemsPaneMessage?.(), 4000);
        }
      } catch(e) {}
    },

    // ── perma.cc API ─────────────────────────────────────

    async _callPerma(url, apiKey) {
      const folderID = this._getFolderID();
      const body = { url };
      if (folderID) body.folder = folderID;

      let resp;
      try {
        resp = await fetch(this.PERMA_API, {
          method: "POST",
          headers: {
            "Authorization": "ApiKey " + apiKey,
            "Content-Type":  "application/json"
          },
          body: JSON.stringify(body)
        });
      } catch(e) {
        Zotero.log("Perma Archiver: fetch error: " + e);
        return null;
      }
      if (resp.status === 201) {
        const data = await resp.json();
        return "https://perma.cc/" + data.guid;
      }
      if (resp.status === 401) {
        const win = Zotero.getMainWindow();
        if (win) Services.prompt.alert(win,
          "Perma Archiver — Invalid API Key",
          "Update via Tools → Perma Archiver → Set API Key…");
      }
      Zotero.log("Perma Archiver: HTTP " + resp.status + " for " + url);
      return null;
    },

    // ── Fetch folders from perma.cc ──────────────────────

    async fetchFolders(apiKey) {
      try {
        const resp = await fetch(this.PERMA_FOLDERS + "?limit=300", {
          headers: { "Authorization": "ApiKey " + apiKey }
        });
        if (!resp.ok) return null;
        const data = await resp.json();
        return data.objects || [];
      } catch(e) {
        return null;
      }
    },

    // ── Folder selection dialog ───────────────────────────
    // Shows a list dialog with folder names; saves folder ID to prefs

    async promptFolderSelect(window, apiKey) {
      const folders = await this.fetchFolders(apiKey);
      if (!folders || folders.length === 0) {
        Services.prompt.alert(window, "Perma Archiver",
          "Could not fetch folders. Links will be saved to Personal Links.");
        return;
      }

      // Build display list: "Personal Links", "U.S.-Asia Law Institute", etc.
      const names  = folders.map(f => f.name);
      const ids    = folders.map(f => f.id);

      // Find current selection
      const currentID = this._getFolderID();
      let selected = { value: 0 };
      if (currentID) {
        const idx = ids.indexOf(currentID);
        if (idx >= 0) selected.value = idx;
      }

      const ok = Services.prompt.select(
        window,
        "Perma Archiver — Choose Folder",
        "Choose which perma.cc folder to save archives to:",
        names,
        selected
      );

      if (ok) {
        const chosenID   = ids[selected.value];
        const chosenName = names[selected.value];
        this._setFolderID(chosenID);
        Services.prompt.alert(window, "Perma Archiver",
          "✓ Archives will be saved to: " + chosenName);
      }
    },

    // ── Prefs ────────────────────────────────────────────

    _getKey() {
      try { return Services.prefs.getStringPref(this.PREF_APIKEY, ""); }
      catch(e) { return ""; }
    },
    _setKey(v) {
      try { Services.prefs.setStringPref(this.PREF_APIKEY, v); }
      catch(e) {}
    },
    _isOn() {
      try { return Services.prefs.getBoolPref(this.PREF_ON, true); }
      catch(e) { return true; }
    },
    _setOn(v) {
      try { Services.prefs.setBoolPref(this.PREF_ON, v); }
      catch(e) {}
    },
    _getFolderID() {
      try {
        const v = Services.prefs.getIntPref(this.PREF_FOLDER, 0);
        return v || null;
      } catch(e) { return null; }
    },
    _setFolderID(id) {
      try { Services.prefs.setIntPref(this.PREF_FOLDER, id); }
      catch(e) {}
    },
  };
}
