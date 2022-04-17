import { openPopup, popupImage, imgCaption, bigImg } from "./index.js";

//масссив
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

class Card {
  constructor(name, image) {
    this._name = name;
    this._image = image;
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
  _handleBigImg(evt) {
    imgCaption.textContent = evt.target.alt;
    bigImg.src = evt.target.src;
    bigImg.alt = evt.target.alt;
    openPopup(popupImage);
  }

  //удаление карточки
  _handleRemoveCard(evt) {
    const itemElement = evt.target.closest(".card");
    itemElement.remove();
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
    cardImg.addEventListener("click", this._handleBigImg);

    this._element
      .querySelector(".card__like")
      .addEventListener("click", this._handleLikeCard);
    this._element
      .querySelector(".card__trash")
      .addEventListener("click", this._handleRemoveCard);

    return this._element;
  }
}

export { Card, initialCards };
