class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._image = data.image;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    //this._api = api;
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

// class Card {
//   constructor(name, image, likes, cardId, userId, ownerId,
//     handleLikeCard, cardSelector, handleCardClick, handleDeleteCard) {
//     this._name = name;
//     this._image = image;
//     // this._likes = likes;
//     // this._cardId = cardId;
//     // this._userId = userId;
//     // this._ownerId = ownerId;
//     // this._handleLikeCard = handleLikeCard;
//     this._cardSelector = cardSelector;
//     this._handleCardClick = handleCardClick;
//     this._handleDeleteCard = handleDeleteCard;

//   }
//   //клонируем карточку
//   _getTemplate() {
//     const element = document
//       .querySelector(this._cardSelector)
//       .content.querySelector(".card")
//       .cloneNode(true);

//     return element;
//   }

//   //удаление карточки
//   _handleRemoveCard() {
//     //this._element = document.querySelector(".card");
//     this._element.remove();
//     this._element = null;
//   }

//   //лайк карточки
//   _handleLikeCard(evt) {
//     const likeCount = this._element.querySelector(".cards__count-like");
//     const likeBtn = this._element.querySelector(".cards__like");
//     const itemElement = evt.target;
//     itemElement.classList.toggle("card__like_active");
//     this._handleLikeCard(likeCount,likeBtn,itemElement )
//   }
// //проверка ID
//   _cardOwner() {
//     //const trashBtn = this._element.querySelector(".card__trash");
//     if (!this._ownerId === this._userId) {
//       this._trashBtn.remove();
//     }
//   }
//   //счетчик лайков
//   _countLikes() {
//     if(!this._likes.find(item => item._id === this._userId) === undefined) {
//       this._likeBtn.classList.add("card__like_active");
//     }
//   }

//   _setEventListeners() {
//     this._element
//       .querySelector(".card__like")
//       .addEventListener("click", this._handleLikeCard);
//     this._element
//       .querySelector(".card__trash")
//       .addEventListener("click", () => this._handleRemoveCard());
//     this._element
//       .querySelector(".card__image")
//       .addEventListener("click", () =>
//         this._handleCardClick(this._name, this._image)
//       );
//   }

//   // создаем карточку
//   getNewCard() {
//     this._element = this._getTemplate();
//     const cardImg = this._element.querySelector(".card__image");
//     this._setEventListeners();
//     // this._likeCount.textContent = this._likes.length;
//     // this._countLikes();
//     // this._cardOwner();
//     this._element.querySelector(".card__title").textContent = this._name; //текст
//     cardImg.src = this._image; //картинка
//     cardImg.alt = this._name; //название
//     return this._element;
//   }
// }

// export { Card };
