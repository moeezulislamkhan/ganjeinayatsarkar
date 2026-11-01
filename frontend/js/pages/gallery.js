(function () {
  "use strict";

  // TODO: replace placeholder image records with approved gallery data or GIS.api.get().
  var GALLERY = [
    { image: "gallery-1.svg", category: "places" },
    { image: "gallery-2.svg", category: "activities" },
    { image: "gallery-3.svg", category: "details" },
    { image: "gallery-4.svg", category: "places" },
    { image: "gallery-5.svg", category: "activities" },
    { image: "gallery-6.svg", category: "details" },
    { image: "gallery-2.svg", category: "places" },
    { image: "gallery-3.svg", category: "activities" },
    { image: "gallery-4.svg", category: "details" },
    { image: "gallery-5.svg", category: "places" },
    { image: "gallery-6.svg", category: "activities" },
    { image: "gallery-1.svg", category: "details" }
  ];
  var filter = "all";
  var visibleItems = [];
  var selectedIndex = 0;
  var trigger = null;
  var backgroundInert = [];
  var lightbox;
  var lightboxImage;
  var lightboxCaption;

  function t(key) {
    return window.GIS.i18n.t(key);
  }

  function setLightboxContent() {
    var item = visibleItems[selectedIndex];
    if (!item) return;
    lightboxImage.src = "assets/placeholders/" + item.image;
    lightboxImage.alt = t("gallery.imageAlt");
    lightboxCaption.textContent = t("gallery.caption");
  }

  function render() {
    var host = document.getElementById("gallery-grid");
    if (!host) return;
    visibleItems = GALLERY.filter(function (item) {
      return filter === "all" || item.category === filter;
    });
    host.replaceChildren();
    visibleItems.forEach(function (item, index) {
      var button = document.createElement("button");
      button.className = "gallery-card";
      button.type = "button";
      button.setAttribute("aria-label", t("gallery.caption"));
      var image = document.createElement("img");
      image.src = "assets/placeholders/" + item.image;
      image.width = 480;
      image.height = 356;
      image.loading = "lazy";
      image.alt = t("gallery.imageAlt");
      button.appendChild(image);
      var caption = document.createElement("span");
      caption.className = "gallery-card__caption";
      caption.textContent = t("shared.placeholder") + ": " + t("gallery.caption");
      button.appendChild(caption);
      button.addEventListener("click", function () { open(index, button); });
      host.appendChild(button);
    });
    if (lightbox && !lightbox.hidden) setLightboxContent();
  }

  function open(index, element) {
    selectedIndex = index;
    trigger = element;
    setLightboxContent();
    backgroundInert = ["site-header", "main", "site-footer"].map(function (id) {
      var element = document.getElementById(id);
      var wasInert = element.inert;
      element.inert = true;
      return { element: element, wasInert: wasInert };
    });
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightbox.querySelector("[data-lightbox-close]").focus();
  }

  function close() {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    backgroundInert.forEach(function (item) { item.element.inert = item.wasInert; });
    backgroundInert = [];
    if (trigger && document.contains(trigger)) trigger.focus();
    trigger = null;
  }

  function move(direction) {
    if (!visibleItems.length) return;
    selectedIndex = (selectedIndex + direction + visibleItems.length) % visibleItems.length;
    setLightboxContent();
  }

  function focusable() {
    return Array.prototype.slice.call(lightbox.querySelectorAll("button:not(:disabled)"));
  }

  function init() {
    lightbox = document.getElementById("gallery-lightbox");
    if (!lightbox) return;
    lightboxImage = lightbox.querySelector("[data-lightbox-image]");
    lightboxCaption = lightbox.querySelector("[data-lightbox-caption]");
    document.querySelectorAll("[data-gallery-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        filter = button.getAttribute("data-gallery-filter");
        document.querySelectorAll("[data-gallery-filter]").forEach(function (chip) {
          chip.setAttribute("aria-pressed", String(chip === button));
        });
        close();
        render();
      });
    });
    lightbox.querySelector("[data-lightbox-close]").addEventListener("click", close);
    lightbox.querySelector("[data-lightbox-prev]").addEventListener("click", function () { move(-1); });
    lightbox.querySelector("[data-lightbox-next]").addEventListener("click", function () { move(1); });
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) close();
    });
    lightbox.addEventListener("keydown", function (event) {
      var rtl = document.documentElement.dir === "rtl";
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === (rtl ? "ArrowRight" : "ArrowLeft")) {
        event.preventDefault();
        move(-1);
      } else if (event.key === (rtl ? "ArrowLeft" : "ArrowRight")) {
        event.preventDefault();
        move(1);
      } else if (event.key === "Tab") {
        var controls = focusable();
        var first = controls[0];
        var last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
    document.addEventListener("gis:langchange", render);
    render();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
