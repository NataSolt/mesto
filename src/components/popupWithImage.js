import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._name = this._popup.querySelector(".popup-img__caption");
    this._image = this._popup.querySelector(".popup-img__photo");
  }

  open({ name, link }) {
    this._name.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
