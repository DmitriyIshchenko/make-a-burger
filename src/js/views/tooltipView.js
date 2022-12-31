class TooltipView {
  _parentElement = document.querySelector(".tooltip");

  showTooltip() {
    this._parentElement.classList.remove("hidden");
  }

  hideTooltip() {
    this._parentElement.classList.add("hidden");
  }
}

export default new TooltipView();
