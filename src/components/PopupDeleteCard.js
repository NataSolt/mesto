import Popup from "./Popup.js";
export class PopupDeleteCard extends Popup {
constructor(popupSelector, handleDelete) {
    super(popupSelector)
    this._submitButton = this._popup.querySelector(".popup__submit");
    this._handleDelete = handleDelete
}
setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', ()=> {
        this._handleDelete();
    })
}
}