import View from "./View";
import images from "url:../../img/*.png";

class TooltipView extends View {
  _parentElement = document.querySelector(".tooltip");

  showTooltip() {
    this._parentElement.classList.remove("hidden");
  }

  hideTooltip() {
    this._parentElement.classList.add("hidden");
  }

  _generateMarkup() {
    return `
    <img class="tooltip__emoji" src="${images["emoji-shocked"]}">
    <p>Are you sure?</p>
    `;
  }
}

export default new TooltipView();
