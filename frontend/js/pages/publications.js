(function () {
  "use strict";

  // TODO: replace placeholder records with approved publications or GIS.api.get() data.
  var PUBLICATIONS = [
    { type: "book", image: "book-1.svg" },
    { type: "article", image: "book-2.svg" },
    { type: "book", image: "book-3.svg" },
    { type: "article", image: "book-4.svg" },
    { type: "book", image: "book-2.svg" },
    { type: "article", image: "book-1.svg" },
    { type: "book", image: "book-4.svg" },
    { type: "article", image: "book-3.svg" }
  ];
  var activeFilter = "all";

  function translated(key) {
    return window.GIS.i18n.t(key);
  }

  function textElement(tag, key, className) {
    var element = document.createElement(tag);
    element.textContent = translated(key);
    if (className) element.className = className;
    return element;
  }

  function render() {
    var grid = document.getElementById("pub-grid");
    var empty = document.getElementById("pub-empty");
    if (!grid || !empty) return;
    grid.replaceChildren();
    var items = PUBLICATIONS.filter(function (item) {
      return activeFilter === "all" || item.type === activeFilter;
    });
    items.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "pub-card card";
      var cover = document.createElement("div");
      cover.className = "pub-card__cover placeholder-box";
      var image = document.createElement("img");
      image.src = "assets/placeholders/" + item.image;
      image.width = 240;
      image.height = 336;
      image.loading = "lazy";
      image.alt = translated("pub.coverAlt");
      cover.appendChild(image);
      cover.appendChild(textElement("span", "shared.placeholder", "placeholder-box__label"));
      cover.appendChild(textElement("span", "shared.placeholder", "placeholder-box__label"));
      card.appendChild(cover);
      card.appendChild(textElement("h3", "pub.itemTitle"));
      card.appendChild(textElement("p", "pub.author", "pub-card__author"));
      card.appendChild(textElement("span", item.type === "book" ? "pub.typeBook" : "pub.typeArticle", "badge"));
      var action = textElement("button", "pub.readDownload", "btn btn--outline-dark");
      action.type = "button";
      action.disabled = true;
      card.appendChild(action);
      grid.appendChild(card);
    });
    empty.hidden = items.length > 0;
  }

  function init() {
    document.querySelectorAll("[data-pub-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        activeFilter = button.getAttribute("data-pub-filter");
        document.querySelectorAll("[data-pub-filter]").forEach(function (filter) {
          filter.setAttribute("aria-pressed", String(filter === button));
        });
        render();
      });
    });
    document.addEventListener("gis:langchange", render);
    render();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
