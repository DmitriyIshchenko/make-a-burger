import View from "../View";
class ModalView extends View {
  _parentElement = document.querySelector(".modal");
  _modalOpenBtn = document.querySelector(".summary__btn");

  constructor() {
    super();
    this._addHandlerToggleModal();
  }

  _addHandlerToggleModal() {
    [this._parentElement, this._modalOpenBtn].forEach((item) =>
      item.addEventListener("click", this._toggleModal.bind(this))
    );
  }

  _toggleModal(e) {
    if (
      e.target.type === "button" ||
      e.target.type === "reset" ||
      e.target.classList.contains("modal__backdrop")
    )
      this._parentElement.classList.toggle("hidden");
  }

  update(data) {
    if (!data.completed) {
      this._modalOpenBtn.setAttribute("disabled", "");
    } else this._modalOpenBtn.removeAttribute("disabled");
  }
}

export default new ModalView();
