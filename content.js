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

    PREF_APIKEY    : "extensions.perma-archiver.apiKey",
    PREF_ON        : "extensions.perma-archiver.enabled",
    PREF_FOLDER    : "extensions.perma-archiver.folderID",
    PREF_FOLDER_NAME: "extensions.perma-archiver.folderName",
    PREF_QUOTA_MAP : "extensions.perma-archiver.quotaMap",
    PERMA_API      : "https://api.perma.cc/v1/archives/",
    PERMA_FOLDERS  : "https://api.perma.cc/v1/folders/",
    MENU_ID        : "perma-archiver-menu",

    _quotaWarned: new Set(),

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

      // blogPost and forumPost don't have a "place" field — store in extra instead
      const NO_PLACE = new Set(["blogPost", "forumPost"]);
      if (!NO_PLACE.has(item.itemType)) {
        item.setField("place", permaUrl);
      } else {
        let extra = item.getField("extra") || "";
        if (!extra.includes("perma.cc")) {
          extra = extra ? extra.trimEnd() + "\nArchive: " + permaUrl : "Archive: " + permaUrl;
          item.setField("extra", extra);
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
        Zotero.log("Perma Archiver: API response keys: " + Object.keys(data).join(", "));
        Zotero.log("Perma Archiver: links_remaining = " + JSON.stringify(data.links_remaining));
        const remaining = data.links_remaining;
        if (typeof remaining === "number") {
          const folderKey  = this._getFolderID() ? String(this._getFolderID()) : "personal";
          const folderName = this._getFolderName();
          this._updateQuota(folderKey, folderName, remaining);
          if (remaining <= 2) this._warnLowQuota(folderKey, folderName, remaining);
        }
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
        this._setFolderName(chosenName);
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
    _getFolderName() {
      try { return Services.prefs.getStringPref(this.PREF_FOLDER_NAME, "Personal Links"); }
      catch(e) { return "Personal Links"; }
    },
    _setFolderName(v) {
      try { Services.prefs.setStringPref(this.PREF_FOLDER_NAME, v || "Personal Links"); }
      catch(e) {}
    },

    // ── Quota tracking ───────────────────────────────────

    _getQuotaMap() {
      try {
        const raw = Services.prefs.getStringPref(this.PREF_QUOTA_MAP, "{}");
        return JSON.parse(raw);
      } catch(e) { return {}; }
    },
    _updateQuota(folderKey, folderName, remaining) {
      try {
        const map = this._getQuotaMap();
        map[folderKey] = {
          name: folderName,
          remaining,
          updated: new Date().toISOString().slice(0, 10),
        };
        Services.prefs.setStringPref(this.PREF_QUOTA_MAP, JSON.stringify(map));
      } catch(e) {}
    },
    _warnLowQuota(folderKey, folderName, remaining) {
      if (this._quotaWarned.has(folderKey)) return;
      this._quotaWarned.add(folderKey);
      try {
        const win = Zotero.getMainWindow();
        if (!win) return;
        Services.prompt.alert(win,
          "Perma Archiver — Low Quota",
          "Warning: only " + remaining + " archive" + (remaining === 1 ? "" : "s") +
          " remaining in \"" + folderName + "\".\n\n" +
          "Consider switching to your institution's folder:\n" +
          "Tools \u2192 Perma Archiver \u2192 Choose Save Folder\u2026"
        );
      } catch(e) {}
    },
    showQuota(window) {
      const map  = this._getQuotaMap();
      const keys = Object.keys(map);
      if (keys.length === 0) {
        Services.prompt.alert(window, "Perma Archiver — Quota",
          "No quota data yet.\n\n" +
          "Remaining quota is recorded automatically after your first archive.");
        return;
      }
      const lines = keys.map(k => {
        const e = map[k];
        return e.name + ":  " + e.remaining + " remaining  (updated " + e.updated + ")";
      });
      Services.prompt.alert(window, "Perma Archiver — Quota",
        lines.join("\n\n"));
    },
  };
}
