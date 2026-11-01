(function () {
  "use strict";

  var ERROR_KEYS = {
    name: "contactPage.nameError",
    email: "contactPage.emailError",
    phone: "contactPage.phoneError",
    message: "contactPage.messageError"
  };
  var errors = {};
  var success = false;
  var sending = false;

  function t(key) {
    return window.GIS.i18n.t(key);
  }

  function field(name) {
    return document.getElementById("contact-" + name);
  }

  function validate() {
    var values = {
      name: field("name").value.trim(),
      email: field("email").value.trim(),
      phone: field("phone").value.trim(),
      message: field("message").value.trim()
    };
    errors = {};
    if (!values.name) errors.name = ERROR_KEYS.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = ERROR_KEYS.email;
    if (values.phone && !/^[+()\d\s-]{7,20}$/.test(values.phone)) errors.phone = ERROR_KEYS.phone;
    if (!values.message) errors.message = ERROR_KEYS.message;
    renderState();
    return Object.keys(errors).length === 0;
  }

  function renderState() {
    Object.keys(ERROR_KEYS).forEach(function (name) {
      var input = field(name);
      var error = document.getElementById("contact-" + name + "-error");
      if (errors[name]) {
        input.setAttribute("aria-invalid", "true");
        error.textContent = t(errors[name]);
      } else {
        input.removeAttribute("aria-invalid");
        error.textContent = "";
      }
    });
    var status = document.getElementById("contact-form-status");
    status.replaceChildren();
    if (success) {
      var alert = document.createElement("p");
      alert.className = "alert alert--success";
      alert.textContent = t("contactPage.success");
      status.appendChild(alert);
    }
    var submit = document.querySelector("#contact-form button[type='submit']");
    submit.disabled = sending;
    submit.textContent = t(sending ? "contactPage.sending" : "contactPage.submit");
  }

  function init() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      success = false;
      if (!validate()) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      if (field("website").value) return;
      sending = true;
      renderState();
      // TODO: Day 4: POST /api/contact
      window.setTimeout(function () {
        form.reset();
        errors = {};
        success = true;
        sending = false;
        renderState();
      }, 350);
    });
    ["name", "email", "phone", "message"].forEach(function (name) {
      field(name).addEventListener("input", function () {
        if (errors[name] || success) {
          success = false;
          validate();
        }
      });
    });
    document.addEventListener("gis:langchange", renderState);
    renderState();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
