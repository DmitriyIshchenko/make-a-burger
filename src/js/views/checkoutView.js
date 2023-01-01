import View from "./View";
class CheckoutView extends View {
  _popup = document.querySelector(".popup");
  _overlay = document.querySelector(".overlay");

  _checkoutBtn = document.querySelector(".summary__btn");
  _cancelBtn = document.querySelector(".form__btn--cancel");
  _closeBtn = document.querySelector(".popup__close");

  constructor() {
    super();
    this.addHandlerTogglePopup();
  }

  addHandlerTogglePopup() {
    [this._checkoutBtn, this._overlay, this._cancelBtn, this._closeBtn].forEach(
      (item) => item.addEventListener("click", this.togglePopup.bind(this))
    );
  }

  togglePopup() {
    this._popup.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }
}

export default new CheckoutView();
