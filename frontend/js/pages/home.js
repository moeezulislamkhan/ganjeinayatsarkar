(function () {
  "use strict";

  // TODO: replace all placeholder records with approved content from GIS.api.get().
  // Placeholder records are replaced by GIS.api.get() when the content API is ready.
  var HOME_CONTENT = {
    slides: [
      { image: "hero-1.svg", title: "home.hero.slide1.title", text: "home.hero.slide1.text", eyebrow: "home.hero.slide1.eyebrow", action: "home.hero.slide1.cta", href: "about.html", alt: "home.hero.slide1.alt" },
      { image: "hero-2.svg", title: "home.hero.slide2.title", text: "home.hero.slide2.text", eyebrow: "home.hero.slide2.eyebrow", action: "home.hero.slide2.cta", href: "khidmaat.html", alt: "home.hero.slide2.alt" },
      { image: "hero-3.svg", title: "home.hero.slide3.title", text: "home.hero.slide3.text", eyebrow: "home.hero.slide3.eyebrow", action: "home.hero.slide3.cta", href: "publications.html", alt: "home.hero.slide3.alt" }
    ],
    books: [
      { image: "book-1.svg", title: "home.books.item1", alt: "home.books.imageAlt1" },
      { image: "book-2.svg", title: "home.books.item2", alt: "home.books.imageAlt2" },
      { image: "book-3.svg", title: "home.books.item3", alt: "home.books.imageAlt3" },
      { image: "book-4.svg", title: "home.books.item4", alt: "home.books.imageAlt4" }
    ],
    news: [
      { image: "news-1.svg", title: "home.news.item1", text: "home.news.text1", alt: "home.news.imageAlt1" },
      { image: "news-2.svg", title: "home.news.item2", text: "home.news.text2", alt: "home.news.imageAlt2" },
      { image: "news-3.svg", title: "home.news.item3", text: "home.news.text3", alt: "home.news.imageAlt3" }
    ],
    gallery: [
      { image: "gallery-1.svg", alt: "home.gallery.imageAlt1" },
      { image: "gallery-2.svg", alt: "home.gallery.imageAlt2" },
      { image: "gallery-3.svg", alt: "home.gallery.imageAlt3" },
      { image: "gallery-4.svg", alt: "home.gallery.imageAlt4" },
      { image: "gallery-5.svg", alt: "home.gallery.imageAlt5" },
      { image: "gallery-6.svg", alt: "home.gallery.imageAlt6" }
    ]
  };

  function slideMarkup(item, index) {
    var loading = index === 0 ? 'fetchpriority="high"' : 'loading="lazy"';
    return '<article class="home-slide" data-slide>' +
      '<div class="home-slide__visual home-placeholder"><img src="assets/placeholders/' + item.image + '" width="800" height="600" ' + loading + ' alt="" data-i18n-alt="' + item.alt + '">' +
      '<span class="home-placeholder__label" data-i18n="home.placeholder">Placeholder</span></div>' +
      '<div class="home-slide__copy"><p class="eyebrow" data-i18n="' + item.eyebrow + '"></p>' +
      '<h2 data-i18n="' + item.title + '"></h2><p data-i18n="' + item.text + '"></p>' +
      '<a class="btn btn--gold" href="' + item.href + '" data-i18n="' + item.action + '"></a></div></article>';
  }

  function renderSlider(i18n) {
    var root = document.getElementById("home-hero-slider");
    if (!root) return;
    root.querySelector(".home-slider__slides").innerHTML = HOME_CONTENT.slides.map(slideMarkup).join("");
    root.querySelector(".home-slider__dots").innerHTML = HOME_CONTENT.slides.map(function (_slide, index) {
      return '<button class="home-slider__dot" type="button" data-slide-to="' + index +
        '" data-i18n-aria-label="home.slider.choose" aria-label="Choose slide"></button>';
    }).join("");
    i18n.applyI18n(root);
    new window.GIS.AccessibleSlider(root, { delay: 6000 });
  }

  function renderBooks(i18n) {
    var host = document.getElementById("home-books");
    if (!host) return;
    host.innerHTML = HOME_CONTENT.books.map(function (item) {
      return '<article class="home-book"><div class="home-book__cover home-placeholder">' +
        '<img src="assets/placeholders/' + item.image + '" width="240" height="336" loading="lazy" alt="" data-i18n-alt="' + item.alt + '">' +
        '<span class="home-placeholder__label" data-i18n="home.placeholder"></span></div>' +
        '<h3 data-i18n="' + item.title + '"></h3><span class="home-book__label" data-i18n="home.placeholder"></span></article>';
    }).join("");
    i18n.applyI18n(host);
  }

  function renderNews(i18n) {
    var host = document.getElementById("home-news-list");
    if (!host) return;
    host.innerHTML = HOME_CONTENT.news.map(function (item) {
      return '<article class="home-news-item"><div class="home-news-item__image home-placeholder">' +
        '<img src="assets/placeholders/' + item.image + '" width="160" height="160" loading="lazy" alt="" data-i18n-alt="' + item.alt + '">' +
        '<span class="home-placeholder__label" data-i18n="home.placeholder"></span></div><div><time data-i18n="home.news.datePlaceholder"></time><h3 data-i18n="' + item.title + '"></h3>' +
        '<p data-i18n="' + item.text + '"></p></div></article>';
    }).join("");
    i18n.applyI18n(host);
  }

  function renderGallery(i18n) {
    var host = document.getElementById("home-gallery-scroller");
    if (!host) return;
    host.innerHTML = HOME_CONTENT.gallery.map(function (item) {
      return '<div class="home-gallery__item home-placeholder"><img src="assets/placeholders/' + item.image +
        '" width="480" height="356" loading="lazy" alt="" data-i18n-alt="' + item.alt +
        '"><span class="home-placeholder__label" data-i18n="home.placeholder"></span></div>';
    }).join("");
    i18n.applyI18n(host);
  }

  function initGallery() {
    var scroller = document.getElementById("home-gallery-scroller");
    var previous = document.querySelector("[data-gallery-prev]");
    var next = document.querySelector("[data-gallery-next]");
    if (!scroller || !previous || !next) return;
    function scrollByCard(direction) {
      var item = scroller.querySelector(".home-gallery__item");
      if (!item) return;
      var distance = item.getBoundingClientRect().width + parseFloat(getComputedStyle(scroller).columnGap);
      scroller.scrollBy({ left: direction * distance * (document.documentElement.dir === "rtl" ? -1 : 1), behavior: "smooth" });
    }
    previous.addEventListener("click", function () { scrollByCard(-1); });
    next.addEventListener("click", function () { scrollByCard(1); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var i18n = window.GIS.i18n;
    renderSlider(i18n);
    renderBooks(i18n);
    renderNews(i18n);
    renderGallery(i18n);
    initGallery();
    i18n.applyI18n(document.querySelector(".home"));
  });
})();
