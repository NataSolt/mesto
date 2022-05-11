class Card {
  constructor(name, image, cardSelector, handleCardClick) {
    this._name = name;
    this._image = image;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  //клонируем карточку
  _getTemplate() {
    const element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return element;
  }

  //удаление карточки
  _handleRemoveCard() {
    //this._element = document.querySelector(".card");
    this._element.remove();
    this._element = null;
  }

  //лайк карточки
  _handleLikeCard(evt) {
    const itemElement = evt.target;
    itemElement.classList.toggle("card__like_active");
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like")
      .addEventListener("click", this._handleLikeCard);
    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => this._handleRemoveCard());
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._name, this._image)
      );
  }

  // создаем карточку
  getNewCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector(".card__image");
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._name; //текст
    cardImg.src = this._image; //картинка
    cardImg.alt = this._name; //название
    return this._element;
  }
}

export { Card };
