<<<<<<< HEAD
import imagesPng from 'url:../../../img/ingredients/*.png';
import imagesWebp from 'url:../../../img/ingredients/*.webp';
import View from '../View';

=======
import View from '../View';

const imgs = require.context('../../../img/ingredients/', true);
const imagePath = (name) => imgs(name, true);

>>>>>>> webpack-migration
class IngredientsView extends View {
  _parentElement = document.querySelector('.ingredients');

  addHandlerUpdateQuantity(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-update-quantity');

      if (!btn) return;

      const { name, updateTo } = btn.dataset;

      if (updateTo < 0) return;
      handler(name, +updateTo);
    });
  }

  _generateMarkup() {
    return Object.values(this._data)
      .filter((item) => !item.name.includes('-')) // exclude top and bottom buns
      .map(this._generateCardMarkup)
      .join('');
  }

  _generateCardMarkup(ingredient) {
    const { name, quantity } = ingredient;
    return `
    <div class="card">
      <picture class="card__img-box">
        <source srcset="${imagePath(`./${name}.webp`)}" type="image/webp">
        <source srcset="${imagePath(`./${name}.png`)}" type="image/png">
        <img class="card__img" src="${imagePath(
          `./${name}.png`
        )}" alt="${name}">
      </picture>

      <p class="card__title">${name}</p>

      <div class="card__controls">
        <button 
          class="card__btn btn-update-quantity" 
          data-update-to=${quantity - 1} 
          data-name=${name}
          >&minus;
          </button>

        <span class="card__quantity">${quantity}</span>

        <button 
        class="card__btn btn-update-quantity" 
        data-update-to=${quantity + 1} 
        data-name=${name}>&plus;
        </button>
      </div>
    </div>
    `;
  }
}

export default new IngredientsView();
