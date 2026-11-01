/* Minimal i18n: dictionaries + language state. Plain script, exposes window.GIS.i18n */
(function () {
  "use strict";

  var DICT = {
    en: {
      "brand.name": "Ganj-e-Inayat Sarkar",
      "brand.tag": "Silsila-e-Naqshbandia",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.silsila": "Silsila-e-Naqshbandia",
      "nav.khidmaat": "Khidmaat",
      "nav.hadith": "Hadith",
      "nav.publications": "Publications",
      "nav.gallery": "Gallery",
      "nav.news": "News",
      "nav.contact": "Contact",
      "nav.menu": "Open menu",
      "nav.primary": "Main navigation",
      "lang.switch": "اردو",
      "lang.switchLabel": "Switch to Urdu",
      "skip": "Skip to content",
      "footer.about": "A center of spiritual guidance, Islamic knowledge and social welfare, connected with the blessed Silsila-e-Naqshbandia.",
      "footer.links": "Quick links",
      "footer.contact": "Contact",
      "footer.follow": "Follow us",
      "footer.rights": "All rights reserved.",
      "footer.privacy": "Privacy Policy",
      "contact.address": "Qabristan Block A-3, Gulberg III, Lahore, Punjab, Pakistan",
      "contact.whatsapp": "+92 333 4328031",
      "contact.email": "ganjeinayatofficial@gmail.com"
    },
    ur: {
      "brand.name": "گنجِ عنایت سرکار",
      "brand.tag": "سلسلۂ نقشبندیہ",
      "nav.home": "پہلا صفحہ",
      "nav.about": "تعارف",
      "nav.silsila": "سلسلۂ نقشبندیہ",
      "nav.khidmaat": "خدمات",
      "nav.hadith": "احادیث",
      "nav.publications": "تصانیف",
      "nav.gallery": "گیلری",
      "nav.news": "خبریں",
      "nav.contact": "رابطہ",
      "nav.menu": "مینو کھولیں",
      "nav.primary": "مرکزی مینو",
      "lang.switch": "English",
      "lang.switchLabel": "انگریزی میں دیکھیں",
      "skip": "مواد پر جائیں",
      "footer.about": "روحانی رہنمائی، اسلامی علوم اور سماجی خدمت کا مرکز، سلسلۂ نقشبندیہ سے وابستہ۔",
      "footer.links": "فوری روابط",
      "footer.contact": "رابطہ",
      "footer.follow": "ہمیں فالو کریں",
      "footer.rights": "جملہ حقوق محفوظ ہیں۔",
      "footer.privacy": "پرائیویسی پالیسی",
      "contact.address": "قبرستان بلاک اے تھری گلبرگ تھری، لاہور، پنجاب پاکستان",
      "contact.whatsapp": "+92 333 4328031",
      "contact.email": "ganjeinayatofficial@gmail.com"
    }
  };
  // NOTE: Urdu strings above are DRAFT translations; the institution must approve them.

  var STORAGE_KEY = "gis-lang";
  var lang = "en";

  function readStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function writeStored(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) { /* storage blocked: ignore */ }
  }

  function t(key) {
    return (DICT[lang] && DICT[lang][key]) || DICT.en[key] || key;
  }

  function applyDocumentLang() {
    var html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ur" ? "rtl" : "ltr";
  }

  // Fills any element carrying data-i18n="key".
  function applyI18n(root) {
    (root || document).querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
  }

  function setLang(next) {
    if (!DICT[next]) return;
    lang = next;
    writeStored(next);
    applyDocumentLang();
    document.dispatchEvent(new CustomEvent("gis:langchange", { detail: { lang: next } }));
  }

  function init() {
    var stored = readStored();
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    lang = DICT[fromUrl] ? fromUrl : (DICT[stored] ? stored : "en");
    applyDocumentLang();
  }

  window.GIS = window.GIS || {};
  window.GIS.i18n = {
    init: init, t: t, setLang: setLang, applyI18n: applyI18n,
    getLang: function () { return lang; }
  };
})();
