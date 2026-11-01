/* Thin fetch wrapper. All API calls go through here (used from Day 4). */
(function () {
  "use strict";
  var BASE = "/api";

  function get(path, params) {
    var query = new URLSearchParams(Object.assign({ lang: window.GIS.i18n.getLang() }, params || {}));
    return fetch(BASE + path + "?" + query.toString(), { headers: { Accept: "application/json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed: " + res.status);
        return res.json();
      });
  }

  window.GIS = window.GIS || {};
  window.GIS.api = { get: get };
})();
