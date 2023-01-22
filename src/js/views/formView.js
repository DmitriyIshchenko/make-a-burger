import View from "./View";

class FormView extends View {
  _parentElement = document.querySelector(".form");
  _textInputs = this._parentElement.querySelectorAll("input[type='text']");
  _phoneInput = this._parentElement.querySelector("input[type='tel']");
  _submitBtn = this._parentElement.querySelector("button[type='submit']");

  constructor() {
    super();
    this._addPhoneFocusHandler();
    this._addPhoneMaskHandler();
    this._addPhoneValidationHandler();
    this._addTextValidationHandler();
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
    this._phoneInput.addEventListener(
      "change",
      this._toggleInvalid.bind(this, this._phoneValidator)
    );
  }

  _addTextValidationHandler() {
    this._textInputs.forEach((input) =>
      input.addEventListener(
        "focusout",
        this._toggleInvalid.bind(this, this._textValidator)
      )
    );
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

  _toggleInvalid(validator, e) {
    if (!validator(e.target.value)) {
      e.target.classList.add("form__input--invalid");
    } else e.target.classList.remove("form__input--invalid");
  }

  _textValidator(text) {
    return text.trim().length !== 0;
  }

  _phoneValidator(phone) {
    const regex = /^\+\d \(\d{3}\) \d{3}-\d{4}/;
    return regex.test(phone);
  }
}

export default new FormView();
