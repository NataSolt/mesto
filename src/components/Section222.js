export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //добавляет
  addItem(element) {
    this._container.prepend(element);
  }

  //перебирает каждую карточку
  renderItem(data) {
    data.forEach(this._renderer);
  }
}
