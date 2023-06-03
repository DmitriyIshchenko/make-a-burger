export default class View {
  _data;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  render(data) {
    this._data = data;

    const markup = this._generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // changes only text and attributes
  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    // Convert string to DOM object
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // convert NodeLists to arrays
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    /* 
      Compare both DOMS and update only elements containing text.
      isEqualNode() checks for changes, the text itself is in a child text node 
      (might not exist) -  nodeValue returns text if node is text node, and null otherwise. 
      Element node -> Text node -> text
      */
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim())
        curEl.textContent = newEl.textContent;

      // Update changed attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
