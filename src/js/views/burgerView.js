import View from "./View";
import images from "url:../../img/*.png";

class BurgerView extends View {
  _parentElement = document.querySelector(".burger__ingredients");

  animateDeleted(index) {
    const images = Array.from(
      this._parentElement.querySelectorAll(".burger__ingredient")
    );

    // shift to the left deleted element
    const target = images[index];
    target.classList.add("burger__ingredient--delete");

    // move down ingredients on top of deleted ingredients
    const ingredientsOnTop = images.slice(index + 1);
    ingredientsOnTop.forEach((item) =>
      item.classList.add("burger__ingredient--top")
    );
  }

  _generateMarkup(withNew) {
    return this._data
      .map(this._generateIngredientMarkup.bind(withNew))
      .join("");
  }

  _generateIngredientMarkup(ing, index, array) {
    const isNew = this && index === array.length - 1;
    return `
    <img 
      class="burger__ingredient burger__ingredient--${ing} ${
      isNew ? "burger__ingredient--new" : ""
    }" 
      style="z-index:${index};bottom:${index * 5}%" 
      src="${images[ing]}" 
      alt="${ing}"
    >
    `;
  }
}

export default new BurgerView();
