import View from '../View';

class NavigationView extends View {
  _parentSelector = '.header';
  _className = 'nav';
  _tag = 'nav';

  _parent;
  _element;

  constructor() {
    super();

    this._parent = document.querySelector('.header');
    this._element = this._mount();

    this._handleToggleMobileNav();
  }

  _generateMarkup() {
    return `
      <ul class="nav__list">
        <li class="nav__item"><a href="#discover" class="nav__link nav__link--active">Discover</a></li>
        <li class="nav__item">
          <a href="#create-burger" class="nav__link">Make Your Burger</a>
        </li>
        <li class="nav__item nav__phone-number-box">
          <a href="tel:+88004378722" class="nav__phone-number">8 800
            437-87-22</a>
        </li>
        <li class="nav__item nav__user">
          <picture>
            <source srcset="src/img/emojis/user.webp" type="image/webp">
            <source srcset="src/img/emojis/user.png" type="image/png">
            <img src="src/img/emojis/user.png" alt="user image" class="nav__user-img">
          </picture>
          <p class="nav__user-name">John Doe</p>
        </li>
      </ul>
    `;
  }

  _handleToggleMobileNav() {
    const mobileNav = document.querySelector('.mobile-nav-btn');
    mobileNav.addEventListener('click', () => this._toggleMobileNav());
    this._element.addEventListener('click', (e) => {
      const link = e.target.closest('.nav__link');
      if (!link) return;

      this._toggleMobileNav();
      this._updateActiveLink(link);
    });
  }

  _updateActiveLink(activeLink) {
    const links = document.querySelectorAll('.nav__link');
    links.forEach((link) => link.classList.remove('nav__link--active'));

    activeLink.classList.add('nav__link--active');
  }

  _toggleMobileNav() {
    this._element.classList.toggle('nav-open');
  }

  /*
  addHandlerToggleTabs() {
    [this._burgerParent, this._navParent].forEach((elem) =>
      elem.addEventListener('click', this._toggleTabs.bind(this))
    );
  }

  _toggleTabs(e) {
    e.preventDefault();
    const clickedLink =
      e.target.closest('.nav__link') || e.target.closest('.burger-demo__btn');
    if (!clickedLink) return;
    const href = clickedLink.getAttribute('href');

    // Update active nav link
    const navLinks = this._navParent.querySelectorAll('.nav__link');
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === href)
        link.classList.add('nav__link--active');
      else link.classList.remove('nav__link--active');
    });

    // Switch tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => tab.classList.add('hidden'));
    document.querySelector(href).classList.remove('hidden');

    // Close mobile nav
    this._navParent.classList.remove('nav-open');
  }
  */
}

export default NavigationView;
