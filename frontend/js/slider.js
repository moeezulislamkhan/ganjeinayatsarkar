(function (global) {
  "use strict";

  function AccessibleSlider(root, options) {
    this.root = root;
    this.options = options || {};
    this.slides = Array.prototype.slice.call(root.querySelectorAll("[data-slide]"));
    this.dots = Array.prototype.slice.call(root.querySelectorAll("[data-slide-to]"));
    this.index = 0;
    this.timer = null;
    this.delay = this.options.delay || 6000;
    this.reducedMotion = global.matchMedia("(prefers-reduced-motion: reduce)");
    this.pointerStart = null;
    this.hovering = false;
    this.focused = false;
    this.bind();
    this.show(0);
    if (!this.reducedMotion.matches) this.start();
  }

  AccessibleSlider.prototype.show = function (index) {
    var count = this.slides.length;
    if (!count) return;
    this.index = (index + count) % count;
    this.slides.forEach(function (slide, i) {
      var active = i === this.index;
      slide.hidden = !active;
      slide.setAttribute("aria-hidden", String(!active));
      slide.inert = !active;
    }, this);
    this.dots.forEach(function (dot, i) {
      if (i === this.index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    }, this);
  };

  AccessibleSlider.prototype.stop = function () {
    global.clearInterval(this.timer);
    this.timer = null;
  };

  AccessibleSlider.prototype.start = function () {
    var self = this;
    this.stop();
    if (this.hovering || this.focused || this.reducedMotion.matches || this.slides.length < 2) return;
    this.timer = global.setInterval(function () { self.show(self.index + 1); }, this.delay);
  };

  AccessibleSlider.prototype.bind = function () {
    var self = this;
    var previous = this.root.querySelector("[data-slider-prev]");
    var next = this.root.querySelector("[data-slider-next]");

    previous.addEventListener("click", function () { self.show(self.index - 1); });
    next.addEventListener("click", function () { self.show(self.index + 1); });
    this.dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        self.show(Number(dot.getAttribute("data-slide-to")));
      });
    });
    this.root.addEventListener("mouseenter", function () {
      self.hovering = true;
      self.stop();
    });
    this.root.addEventListener("mouseleave", function () {
      self.hovering = false;
      self.start();
    });
    this.root.addEventListener("focusin", function () {
      self.focused = true;
      self.stop();
    });
    this.root.addEventListener("focusout", function (event) {
      if (!self.root.contains(event.relatedTarget)) {
        self.focused = false;
        self.start();
      }
    });
    this.root.addEventListener("keydown", function (event) {
      var rtl = document.documentElement.dir === "rtl";
      if (event.key === (rtl ? "ArrowLeft" : "ArrowRight")) {
        event.preventDefault();
        self.show(self.index + 1);
      } else if (event.key === (rtl ? "ArrowRight" : "ArrowLeft")) {
        event.preventDefault();
        self.show(self.index - 1);
      }
    });
    this.root.addEventListener("touchstart", function (event) {
      if (event.changedTouches.length) self.pointerStart = event.changedTouches[0].clientX;
    }, { passive: true });
    this.root.addEventListener("touchend", function (event) {
      if (self.pointerStart === null || !event.changedTouches.length) return;
      var delta = event.changedTouches[0].clientX - self.pointerStart;
      var nextSwipe = document.documentElement.dir === "rtl" ? delta > 40 : delta < -40;
      var previousSwipe = document.documentElement.dir === "rtl" ? delta < -40 : delta > 40;
      if (nextSwipe) self.show(self.index + 1);
      else if (previousSwipe) self.show(self.index - 1);
      self.pointerStart = null;
    }, { passive: true });
    this.reducedMotion.addEventListener("change", function (event) {
      if (event.matches) self.stop();
      else self.start();
    });
  };

  global.GIS = global.GIS || {};
  global.GIS.AccessibleSlider = AccessibleSlider;
})(window);
