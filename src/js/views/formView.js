import View from "./View";

class FormView extends View {
  _parentElement = document.querySelector(".form");
  _phoneInput = this._parentElement.querySelector("#phone");

  constructor() {
    super();
    this._addPhoneFocusHandler();
    this._addPhoneMaskHandler();
    this._addPhoneValidationHandler();
  }

  _addPhoneFocusHandler() {
    this._phoneInput.addEventListener("focus", (e) => {
      if (e.target.value === "") e.target.value = "+7";
    });
  }

  _addPhoneMaskHandler() {
    this._phoneInput.addEventListener("input", this._maskPhone);
  }

  _addPhoneValidationHandler() {
    this._phoneInput.addEventListener("change", this._validatePhone);
  }

  _maskPhone(e) {
    const regex = /134/;
    const phone = e.target.value
      .replace(/\D/g, "")
      .replace(/^(\+\d)?(\d)/, "+7 ($1")
      .replace(/^(\+\d) (\(\d{3})(\d)/, "$1 $2) $3")
      .replace(/(\d{3})(\d{1,4})/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
    e.target.value = phone;
  }

  _validatePhone(e) {
    const regex = /^\+\d \(\d{3}\) \d{3}-\d{4}/;

    if (!regex.test(e.target.value)) this.classList.add("form__input--invalid");
    else this.classList.remove("form__input--invalid");
  }
}

export default new FormView();
