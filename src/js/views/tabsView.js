import View from "./View";
class TabView extends View {
  _navParent = document.querySelector(".nav__list");
  _burgerParent = document.querySelector(".burger-demo");

  constructor() {
    super();
    this.addHandlerToggle();
  }

  addHandlerToggle() {
    [this._burgerParent, this._navParent].forEach((elem) =>
      elem.addEventListener("click", this._toggleTabs.bind(this))
    );
  }

  _toggleTabs(e) {
    e.preventDefault();
    const clickedLink =
      e.target.closest(".nav__link") || e.target.closest(".burger-demo__btn");
    if (!clickedLink) return;
    const href = clickedLink.getAttribute("href");

    // Update active nav link
    const navLinks = this._navParent.querySelectorAll(".nav__link");
    navLinks.forEach((link) => {
      link.getAttribute("href") === href
        ? link.classList.add("nav__link--active")
        : link.classList.remove("nav__link--active");
    });

    // Switch tabs
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => tab.classList.remove("tab--active"));
    document.querySelector(href).classList.add("tab--active");
  }
}

export default new TabView();
