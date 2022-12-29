class TabView {
  _parentElement = document.querySelector(".nav__list");

  constructor() {
    this.addHandlerToggle();
  }

  addHandlerToggle() {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const clickedLink = e.target.closest(".nav__link");
      if (!clickedLink) return;
      const href = clickedLink.getAttribute("href");

      const currentLink = this.querySelector(".nav__link--active");
      currentLink.classList.remove("nav__link--active");
      clickedLink.classList.add("nav__link--active");

      const tabToHide = document.querySelector(".tab--active");
      tabToHide.classList.remove("tab--active");
      const tabToShow = document.querySelector(href);
      tabToShow.classList.add("tab--active");
    });
  }
}

export default new TabView();
