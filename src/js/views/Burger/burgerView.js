import View from '../View';

class BurgerView extends View {
  _parentElement = document.querySelector('.burger__ingredients');

  update(data, toDeleteIndex) {
    if (toDeleteIndex) {
      const images = Array.from(
        this._parentElement.querySelectorAll('.burger__ingredient')
      );

      // shift target element to the left
      const target = images[toDeleteIndex];
      target.classList.add('burger__ingredient--delete');

      // re-render after animation
      target.addEventListener('animationend', this.render.bind(this, data));

      // move down ingredients on top of deleted ingredients
      const topIngredients = images.slice(toDeleteIndex + 1);
      topIngredients.forEach((item) => {
        const bottom = `${parseInt(item.style.bottom, 10) - 5}%`;
        item.style.bottom = bottom;
      });
    } else {
      const topBunEl = this._parentElement.querySelector(
        '.burger__ingredient--bun-top'
      );

      // if there is no bun on top, re-render immediately, otherwise after animation
      if (topBunEl) {
        topBunEl.classList.add('burger__ingredient--delete');
        topBunEl.addEventListener(
          'animationend',
          this._renderNew.bind(this, data)
        );
      } else this._renderNew(data);
    }
  }

  _renderNew(data) {
    this.render(data);
    this._parentElement
      .querySelector('.burger__ingredient:last-child')
      .classList.add('burger__ingredient--new');
  }

  _generateMarkup() {
    return this._data.map(this._generateIngredientMarkup).join('');
  }

  _generateIngredientMarkup(ing, index) {
    return `
    <picture class="burger__ingredient burger__ingredient--${ing}"
     style="bottom:${index * 5}%" >
      <source srcset="src/img/ingredients/${ing}.webp" type='image/webp'>
      <source srcset="src/img/ingredients/${ing}.png" type='image/png'>
      <img src="src/img/ingredients/${ing}.png" alt="${ing}" />
    </picture>
    `;
  }
}

export default new BurgerView();
