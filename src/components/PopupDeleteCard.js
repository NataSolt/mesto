import Popup from "./Popup.js";
export class PopupDeleteCard extends Popup {
  constructor(popupSelector, { handleDeleteItem }) {
    super(popupSelector);
    this._handleDeleteItem = handleDeleteItem;
    this._formPopup = this._popup.querySelector(".popup-form");
    this._submitButton = this._formPopup.querySelector(".popup__submit-delete");
    this._cardInfo = {};
  }
  open(card) {
    super.open();
    this._cardInfo = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      //обновить форму
      this._handleDeleteItem(this._cardInfo);
      //this.close();
    });
  }
}
