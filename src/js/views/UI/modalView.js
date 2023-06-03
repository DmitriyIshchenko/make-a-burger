import View from '../View';

class ModalView extends View {
  _parentElement = document.querySelector('.modal');

  _modalOpenBtn = document.querySelector('.summary__btn');

  constructor() {
    super();
    this.addHandlerOpenModal();
    this.addHandlerCloseModal();
  }

  addHandlerOpenModal() {
    this._modalOpenBtn.addEventListener('click', () => this.openModal());
  }

  addHandlerCloseModal() {
    this._parentElement.addEventListener('click', (e) => {
      if (
        e.target.type === 'button' || // close button
        e.target.type === 'reset' || // reset button
        e.target === e.currentTarget // backdrop
      ) {
        this.closeModal();
      }
    });
  }

  openModal() {
    this._parentElement.showModal();
    document.body.classList.toggle('scroll-lock');
  }

  closeModal() {
    this._parentElement.close();
    document.body.classList.toggle('scroll-lock');
  }

  update(data) {
    if (!data.completed) {
      this._modalOpenBtn.setAttribute('disabled', '');
    } else this._modalOpenBtn.removeAttribute('disabled');
  }
}

export default new ModalView();
