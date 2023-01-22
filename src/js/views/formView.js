import View from "./View";

class FormView extends View {
  _parentElement = document.querySelector(".form");
  _phoneInput = this._parentElement.querySelector("input[type='tel']");
  _submitBtn = this._parentElement.querySelector("button[type='submit']");

  constructor() {
    super();
    this._addResetHandler();
    this._addPhoneFocusHandler();
    this._addPhoneMaskHandler();
    this._addValidationHandler();
  }

  _addResetHandler() {
    this._parentElement.addEventListener("reset", (e) => {
      e.target
        .querySelectorAll(".form__input")
        .forEach((input) => input.classList.remove("form__input--invalid"));
    });
  }

  _addPhoneFocusHandler() {
    this._phoneInput.addEventListener("focus", (e) => {
      if (e.target.value === "") e.target.value = "+7";
    });
  }

  _addPhoneMaskHandler() {
    this._phoneInput.addEventListener("input", this._maskPhone);
  }

  _maskPhone(e) {
    const phone = e.target.value
      .replace(/\D/g, "")
      .replace(/^(\+\d)?(\d)/, "+7 ($1")
      .replace(/^(\+\d) (\(\d{3})(\d)/, "$1 $2) $3")
      .replace(/(\d{3})(\d{1,4})/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
    e.target.value = phone;
  }

  _addValidationHandler() {
    this._parentElement.addEventListener(
      "focusout",
      this._toggleInvalid.bind(this)
    );
  }

  _toggleInvalid(e) {
    const { type } = e.target.dataset;
    const { value } = e.target;
    let isValid;
    switch (type) {
      case "name":
      case "address":
        isValid = this._validateText(value);
        break;
      case "phone":
        isValid = this._validatePhone(value);
        break;
      default:
        return;
    }
    if (!isValid) {
      e.target.classList.add("form__input--invalid");
    } else e.target.classList.remove("form__input--invalid");
  }

  _validateText(text) {
    return text.trim().length !== 0;
  }

  _validatePhone(phone) {
    const regex = /^\+\d \(\d{3}\) \d{3}-\d{4}/;
    return regex.test(phone);
  }
}

export default new FormView();
