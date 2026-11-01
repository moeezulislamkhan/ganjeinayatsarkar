/* Renders the shared header and footer into #site-header / #site-footer.
   One source for every page: change it here, all pages update. */
(function () {
  "use strict";
  var i18n = window.GIS.i18n;
  var t = i18n.t;

  var NAV = [
    ["home", "index.html"],
    ["about", "about.html"],
    ["silsila", "silsila.html"],
    ["khidmaat", "khidmaat.html"],
    ["hadith", "hadith.html"],
    ["publications", "publications.html"],
    ["gallery", "gallery.html"],
    ["news", "news.html"],
    ["contact", "contact.html"]
  ];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function navItems(page) {
    return NAV.map(function (item) {
      var current = item[0] === page ? ' aria-current="page"' : "";
      return '<li><a href="' + item[1] + '"' + current + ">" + esc(t("nav." + item[0])) + "</a></li>";
    }).join("");
  }

  function renderHeader(page) {
    var host = document.getElementById("site-header");
    if (!host) return;
    host.innerHTML =
      '<header class="site-header"><div class="container site-header__inner">' +
        '<a class="brand" href="index.html">' +
          '<img src="assets/logo-placeholder.svg" alt="" width="48" height="48">' +
          '<span class="brand__text"><b>' + esc(t("brand.name")) + "</b><small>" + esc(t("brand.tag")) + "</small></span>" +
        "</a>" +
        '<nav class="nav" id="primary-nav" aria-label="' + esc(t("nav.primary")) + '"><ul>' + navItems(page) + "</ul></nav>" +
        '<div class="header-actions">' +
          '<button class="lang-switch" type="button" id="lang-switch" aria-label="' + esc(t("lang.switchLabel")) + '">' + esc(t("lang.switch")) + "</button>" +
          '<button class="nav-toggle" type="button" id="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="' + esc(t("nav.menu")) + '"><span></span><span></span><span></span></button>' +
        "</div>" +
      "</div></header>";

    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("primary-nav");
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
    document.getElementById("lang-switch").addEventListener("click", function () {
      i18n.setLang(i18n.getLang() === "ur" ? "en" : "ur");
    });
  }

  function renderFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    var year = new Date().getFullYear();
    var links = NAV.slice(0, 5).map(function (item) {
      return '<li><a href="' + item[1] + '">' + esc(t("nav." + item[0])) + "</a></li>";
    }).join("");
    host.innerHTML =
      '<footer class="site-footer pattern-bg"><div class="container site-footer__grid">' +
        "<div>" +
          '<div class="brand"><img src="assets/logo-placeholder.svg" alt="" width="48" height="48">' +
          '<span class="brand__text"><b>' + esc(t("brand.name")) + "</b><small>" + esc(t("brand.tag")) + "</small></span></div>" +
          '<p style="margin-top:var(--space-4);max-width:42ch">' + esc(t("footer.about")) + "</p>" +
        "</div>" +
        "<div><h3>" + esc(t("footer.links")) + "</h3><ul>" + links + "</ul></div>" +
        "<div><h3>" + esc(t("footer.contact")) + "</h3><ul>" +
          '<li data-setting="address">' + esc(t("contact.address")) + "</li>" +
          '<li><span class="num" data-setting="whatsapp">' + esc(t("contact.whatsapp")) + "</span></li>" +
          '<li><span class="latin" data-setting="email">' + esc(t("contact.email")) + "</span></li>" +
        "</ul></div>" +
      "</div>" +
      '<div class="site-footer__bar"><div class="container">' +
        "<span>&copy; " + year + " " + esc(t("brand.name")) + ". " + esc(t("footer.rights")) + "</span>" +
        '<a href="privacy.html">' + esc(t("footer.privacy")) + "</a>" +
      "</div></div></footer>";
  }

  function render() {
    var page = document.body.getAttribute("data-page") || "";
    renderHeader(page);
    renderFooter();
    document.dispatchEvent(new CustomEvent("gis:layoutrendered"));
  }

  i18n.init();
  document.addEventListener("DOMContentLoaded", function () {
    render();
    i18n.applyI18n();
  });
  document.addEventListener("gis:langchange", function () {
    render();
    i18n.applyI18n();
  });
})();
