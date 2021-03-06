import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formPopup = this._popup.querySelector(".popup-form");
    this._inputList = this._popup.querySelectorAll(".popup-input");
    this._handleFormSubmit = handleFormSubmit;
    this.submitButton = this._popup.querySelector(".popup__submit");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    //this._formProfile = this._popup.querySelector(".popup-form");
    this._formPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this.submitButton);
      //this.close();
    });
  }

  close() {
    super.close();
    this._formPopup.reset();
  }
}
