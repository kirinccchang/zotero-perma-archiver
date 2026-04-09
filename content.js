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

    _alreadyArchived(item) {
      if ((item.getField("place") || "").toLowerCase().includes("perma.cc")) return true;
      if ((item.getField("extra") || "").toLowerCase().includes("perma.cc")) return true;
      if ((item.getField("url")   || "").toLowerCase().includes("perma.cc")) return true;
      return false;
    },

    async _processItem(itemID, apiKey) {
      const item = await Zotero.Items.getAsync(itemID);
      if (!item || !this.ARCHIVE_TYPES.has(item.itemType)) return;

      const url = item.getField("url") || "";
      if (!url) return;
      if (this._alreadyArchived(item)) return;

      Zotero.log("Perma Archiver: archiving [" + item.itemType + "] " + url);
      await Zotero.Promise.delay(1500);

      const permaUrl = await this._callPerma(url, apiKey);
      if (!permaUrl) {
        try { item.addTag("perma-failed"); await item.saveTx(); } catch(e) {}
        return;
      }

      // Remove failed tag from any previous attempt
      item.removeTag("perma-failed");

      // Dynamically check if "place" field is valid for this item type
      const placeFieldID = Zotero.ItemFields.getID("place");
      const hasPlace = Zotero.ItemFields.isValidForType(placeFieldID, item.itemTypeID);
      if (hasPlace) {
        item.setField("place", permaUrl);
      } else {
        const currentUrl = item.getField("url") || "";
        if (!currentUrl.includes("perma.cc")) {
          item.setField("url", currentUrl + " [" + permaUrl + "]");
        }
      }
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

    // ── Batch archive ────────────────────────────────────

    async batchArchive(window) {
      const key = this._getKey();
      if (!key) {
        Services.prompt.alert(window, "Perma Archiver",
          "Please set your API key first.\nTools \u2192 Perma Archiver \u2192 Set API Key\u2026");
        return;
      }

      const pane = window.ZoteroPane;
      const selected = pane.getSelectedItems();
      const toArchive = selected.filter(item =>
        this.ARCHIVE_TYPES.has(item.itemType) && !this._alreadyArchived(item)
      );

      if (toArchive.length === 0) {
        Services.prompt.alert(window, "Perma Archiver",
          "No unarchived items selected.\n\n" +
          "Supported types: Webpage \u00b7 Blog Post \u00b7 Newspaper \u00b7 Magazine \u00b7 Forum Post \u00b7 Preprint");
        return;
      }

      const ok = Services.prompt.confirm(window,
        "Perma Archiver \u2014 Batch Archive",
        "Archive " + toArchive.length + " item(s) to perma.cc?"
      );
      if (!ok) return;

      for (let i = 0; i < toArchive.length; i++) {
        pane.setItemsPaneMessage(
          "Perma Archiver: archiving " + (i + 1) + " / " + toArchive.length + "\u2026"
        );
        try { await this._processItem(toArchive[i].id, key); }
        catch(e) { Zotero.log("Perma Archiver: batch error: " + e); }
        if (i < toArchive.length - 1) await Zotero.Promise.delay(1000);
      }

      // Tally results
      let success = 0, failed = 0;
      for (const item of toArchive) {
        const fresh = Zotero.Items.get(item.id);
        if (this._alreadyArchived(fresh)) success++;
        else failed++;
      }

      pane.clearItemsPaneMessage?.();
      Services.prompt.alert(window, "Perma Archiver \u2014 Done",
        "\u2713 Archived: " + success +
        (failed > 0 ? "\n\u2717 Failed: " + failed + "  (tagged \u201cperma-failed\u201d)" : "\nAll succeeded!")
      );
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
