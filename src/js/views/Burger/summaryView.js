import View from '../View';
import icons from '../../../img/sprite.svg';

class SummaryView extends View {
  _parentElement = document.querySelector('.summary');

  _generateMarkup() {
    return ` 
    <h2 class="summary__heading heading-secondary">Summary</h2>
    <span class="summary__price">&dollar;${this._data.price.toFixed(2)}</span>
    <button class="summary__btn">Checkout</button>

    <p class="summary__message">Build a <span class="paragraph--accent">$10</span> burger and get a gift!</p>

    <div class="summary__details">
      <div>
        <svg class="summary__icon summary__icon--time">
          <use href="${icons}#time"></use>
        </svg>
        <span>${this._data.time} min</span></div>
      <div>
        <svg class="summary__icon summary__icon--mass">
          <use href="${icons}#scales"></use>
        </svg>
        <span>${this._data.mass} g</span></div>
      <div>
        <svg class="summary__icon summary__icon--fire">
          <use href="${icons}#fire"></use>
        </svg>
        <span>${this._data.calories} kcal</span></div>
    </div>
    `;
  }
}

export default new SummaryView();
