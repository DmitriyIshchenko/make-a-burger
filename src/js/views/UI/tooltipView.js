import View from '../View';

export default class tooltipView extends View {
  _parentElement;

  _tooltipMessage;

  _tooltipPngImg;

  _tooltipWebpImg;

  _showTooltip() {
    this._parentElement.classList.remove('hidden');
  }

  _hideTooltip() {
    this._parentElement.classList.add('hidden');
  }

  _generateMarkup() {
    let picture = '';
    if (this._tooltipPngImg && this._tooltipWebpImg) {
      picture = `<picture>
        <source srcset=${this._tooltipWebpImg} type="image/webp">
        <source srcset="src/img/emojis/emoji-shocked.png" type="image/png">
        <img class="tooltip__emoji" src=${this._tooltipPngImg}>
      </picture>
    `;
    }
    const markup = `
      ${picture}
      <p>${this._tooltipMessage}</p>
    `;
    return markup;
  }
}
