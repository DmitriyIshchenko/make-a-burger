import View from '../View';

class BurgerDemoView extends View {
  _parentElement = document.querySelector('.burger-demo');

  _animationsCounter = 0;

  constructor() {
    super();
    this.addAnimationHandler();
  }

  addAnimationHandler() {
    this._parentElement.addEventListener(
      'animationend',
      this._updateAnimationCounter.bind(this)
    );
  }

  _updateAnimationCounter() {
    this._animationsCounter += 1;

    if (this._animationsCounter === this._parentElement.getAnimations().length)
      this._parentElement.dataset.type = 'exploded';
  }
}

export default new BurgerDemoView();
