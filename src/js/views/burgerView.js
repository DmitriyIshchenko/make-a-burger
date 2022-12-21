import View from "./View";
import images from "url:../../img/*.png";

class BurgerView extends View {
  _parentElement = document.querySelector(".burger");

  animateDeleted(index) {
    const images = this._parentElement.querySelectorAll(".burger__ingredient");
    const target = images[index];
    target.classList.add("burger__ingredient--delete");
  }

  animateNew() {
    const img = this._parentElement.querySelector(".burger__ingredient");
    img.classList.add("burger__ingredient--new");
  }

  _generateMarkup() {
    return this._data.map(this._generateIngredientMarkup).join("");
  }

  _generateIngredientMarkup(ing, index) {
    return `
    <img 
      class="burger__ingredient burger__ingredient--${ing}" 
      style="z-index:${-index}" 
      src="${images[ing]}" 
      alt="${ing}"
    >
    `;
  }
}

export default new BurgerView();
