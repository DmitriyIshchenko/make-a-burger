import View from '../View';

class HeaderView extends View {
  _parentSelector = '.container';
  _className = 'header';
  _tag = 'header';

  _parent;
  _element;

  constructor() {
    super();

    this._parent = document.body;
    this._element = this._mount();
  }

  _generateMarkup() {
    return `
      <a href="#" class="logo">
        <picture>
          <source srcset="src/img/logo.webp" type="image/webp">
          <source srcset="src/img/logo.png" type="image/png">
          <img src="src/img/logo.png" alt="logo" class="logo__img">
        </picture>
      </a>

      <button class="mobile-nav-btn">
        <span class="mobile-nav-btn__icon"></span>
      </button>
    `;
  }
}

export default HeaderView;
