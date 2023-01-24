import View from "../View";
import imagesPng from "url:../../../img/ingredients/*.png";
import imagesWebp from "url:../../../img/ingredients/*.webp";

class BurgerView extends View {
  _parentElement = document.querySelector(".burger__ingredients");

  update(data, toDeleteIndex) {
    if (toDeleteIndex) {
      const images = Array.from(
        this._parentElement.querySelectorAll(".burger__ingredient")
      );

      // shift target element to the left
      const target = images[toDeleteIndex];
      target.classList.add("burger__ingredient--delete");

      // re-render after animation
      target.addEventListener("animationend", this.render.bind(this, data));

      // move down ingredients on top of deleted ingredients
      const topIngredients = images.slice(toDeleteIndex + 1);
      topIngredients.forEach((item) => {
        const bottom = parseInt(item.style.bottom) - 5 + "%";
        item.style.bottom = bottom;
      });
    } else {
      const topBunEl = this._parentElement.querySelector(
        ".burger__ingredient--bun-top"
      );

      // if there is no bun on top, re-render immediately, otherwise after animation
      if (topBunEl) {
        topBunEl.classList.add("burger__ingredient--delete");
        topBunEl.addEventListener(
          "animationend",
          this._renderNew.bind(this, data)
        );
      } else this._renderNew(data);
    }
  }

  _renderNew(data) {
    this.render(data);
    this._parentElement
      .querySelector(".burger__ingredient:last-child")
      .classList.add("burger__ingredient--new");
  }

  _generateMarkup() {
    return this._data.map(this._generateIngredientMarkup).join("");
  }

  _generateIngredientMarkup(ing, index, arr) {
    return `
    <picture class="burger__ingredient burger__ingredient--${ing}"
     style="bottom:${index * 5}%" >
      <source srcset="${imagesWebp[ing]}" type='image/webp'>
      <source srcset="${imagesPng[ing]}" type='image/png'>
      <img src="${imagesPng[ing]}" alt="${ing}" />
    </picture>
    `;
  }
}

export default new BurgerView();
