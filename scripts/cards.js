import { openPopup, popupImage } from "./index.js";

class Card {
  constructor(name, image) {
    this._name = name;
    this._image = image;
    //большое фото попап
    this._bigImg = document.querySelector(".popup-img__photo");
    //подпись к картинке
    this._imgCaption = document.querySelector(".popup-img__caption");
  }
  //клонируем карточку
  _getTemplate() {
    const element = document
      .querySelector(".card-template")
      .content.querySelector(".card")
      .cloneNode(true);

    return element;
  }

  //создаем попап с картинкой
  _handleBigImg() {
    this._bigImg.src = this._image;
    this._bigImg.alt = this._name;
    this._imgCaption.textContent = this._name;
    openPopup(popupImage);
  }

  //удаление карточки
  _handleRemoveCard() {
    this._element = document.querySelector(".card");
    this._element.remove();
    this._element = null;
  }

  //лайк карточки
  _handleLikeCard(evt) {
    const itemElement = evt.target;
    itemElement.classList.toggle("card__like_active");
  }

  // создаем карточку
  getNewCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector(".card__image");
    this._element.querySelector(".card__title").textContent = this._name; //текст
    cardImg.src = this._image; //картинка
    cardImg.alt = this._name; //название
    cardImg.addEventListener("click", () => this._handleBigImg());

    this._element
      .querySelector(".card__like")
      .addEventListener("click", this._handleLikeCard);
    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => this._handleRemoveCard());

    return this._element;
  }
}

export { Card };
