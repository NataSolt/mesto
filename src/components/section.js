export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._rendererItem = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //добавляет
  addItem(element) {
    this._container.prepend(element);
  }
  //перебирает каждую карточку
  renderItem() {
    this._rendererItem.forEach((item) => this._renderer(item));
  }
}
