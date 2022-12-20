import View from "./View";
import images from "url:../../img/*.png";

class BurgerView extends View {
  _parentElement = document.querySelector(".burger");

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
