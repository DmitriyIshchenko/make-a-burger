import View from '../View';

class TabView extends View {
  _navParent = document.querySelector('.nav');

  _burgerParent = document.querySelector('.burger-demo');

  _mobileNavBtn = document.querySelector('.mobile-nav-btn');

  constructor() {
    super();
    this.addHandlerToggleTabs();
    this.addHandlerToggleMobileNav();
  }

  addHandlerToggleTabs() {
    [this._burgerParent, this._navParent].forEach((elem) =>
      elem.addEventListener('click', this._toggleTabs.bind(this))
    );
  }

  addHandlerToggleMobileNav() {
    this._mobileNavBtn.addEventListener(
      'click',
      this._toggleMobileNav.bind(this)
    );
  }

  _toggleMobileNav() {
    this._navParent.classList.toggle('nav-open');
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
}

export default new TabView();
