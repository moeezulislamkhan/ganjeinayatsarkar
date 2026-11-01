(function () {
  "use strict";

  // TODO: replace placeholder news records and dates with approved updates or GIS.api.get() data.
  var NEWS = [
    { image: "news-1.svg", featured: true },
    { image: "news-2.svg" },
    { image: "news-3.svg" },
    { image: "news-1.svg" },
    { image: "news-3.svg" },
    { image: "news-2.svg" },
    { image: "news-1.svg" }
  ];

  function render() {
    var host = document.getElementById("news-list-items");
    var featuredHost = document.getElementById("news-feature");
    if (!host || !featuredHost) return;
    var t = window.GIS.i18n.t;
    host.replaceChildren();
    featuredHost.replaceChildren();
    var featured = NEWS[0];
    var feature = document.createElement("article");
    feature.className = "news-feature card";
    var featureImageWrap = document.createElement("div");
    featureImageWrap.className = "news-feature__image placeholder-box";
    var featureImage = document.createElement("img");
    featureImage.src = "assets/placeholders/" + featured.image;
    featureImage.width = 160;
    featureImage.height = 160;
    featureImage.loading = "lazy";
    featureImage.alt = t("news.imageAlt");
    featureImageWrap.appendChild(featureImage);
    var featureLabel = document.createElement("span");
    featureLabel.className = "placeholder-box__label";
    featureLabel.textContent = t("shared.placeholder");
    featureImageWrap.appendChild(featureLabel);
    feature.appendChild(featureImageWrap);
    var featureCopy = document.createElement("div");
    featureCopy.className = "news-feature__copy";
    var badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = t("news.featuredLabel");
    featureCopy.appendChild(badge);
    var featureDate = document.createElement("time");
    featureDate.textContent = t("news.datePlaceholder");
    featureCopy.appendChild(featureDate);
    var featureTitle = document.createElement("h3");
    featureTitle.textContent = t("news.featuredTitle");
    featureCopy.appendChild(featureTitle);
    var featureSummary = document.createElement("p");
    featureSummary.textContent = t("news.featuredText");
    featureCopy.appendChild(featureSummary);
    var featuredLink = document.createElement("a");
    featuredLink.className = "home-text-link";
    featuredLink.href = "#news-list";
    featuredLink.textContent = t("shared.readMore");
    featureCopy.appendChild(featuredLink);
    feature.appendChild(featureCopy);
    featuredHost.appendChild(feature);
    NEWS.slice(1).forEach(function (item) {
      var article = document.createElement("article");
      article.className = "news-item card";
      var imageWrap = document.createElement("div");
      imageWrap.className = "news-item__image placeholder-box";
      var image = document.createElement("img");
      image.src = "assets/placeholders/" + item.image;
      image.width = 160;
      image.height = 160;
      image.loading = "lazy";
      image.alt = t("news.imageAlt");
      imageWrap.appendChild(image);
      var label = document.createElement("span");
      label.className = "placeholder-box__label";
      label.textContent = t("shared.placeholder");
      imageWrap.appendChild(label);
      article.appendChild(imageWrap);
      var copy = document.createElement("div");
      var date = document.createElement("time");
      date.textContent = t("news.datePlaceholder");
      copy.appendChild(date);
      var title = document.createElement("h3");
      title.textContent = t("news.itemTitle");
      copy.appendChild(title);
      var excerpt = document.createElement("p");
      excerpt.textContent = t("news.itemText");
      copy.appendChild(excerpt);
      var more = document.createElement("a");
      more.href = "#news-list";
      more.textContent = t("shared.readMore");
      copy.appendChild(more);
      article.appendChild(copy);
      host.appendChild(article);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    document.addEventListener("gis:langchange", render);
  });
})();
