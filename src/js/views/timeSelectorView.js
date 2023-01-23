import View from "./View";

class TimeSelector extends View {
  _parentElement = document.querySelector(".form__input#time");

  _generateMarkup() {
    return this._data.map(this._generateTimeOptionMarkup).join("");
  }

  _generateTimeOptionMarkup(time, index) {
    const timeStr = time.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
    const optionStr = index === 0 ? `~ ${timeStr} ASAP` : timeStr;
    return `<option value=${time.toISOString()}>${optionStr}</option>`;
  }
}

export default new TimeSelector();
