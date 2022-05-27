class Card {
  constructor(data, id, cardSelector, handleCardClick, { handleDelete },{handleLikeCard}) {
    this._data = data;
    this._cardSelector = document.querySelector(cardSelector);
    this._name = data.name;
    this._link = data.link;
    this._myId = id;
    this._item = this._getTemplate();
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLikeCard = handleLikeCard;
    this._deleteBtn = this._item.querySelector(".card__trash");
    this._likeBtn = this._item.querySelector(".card__like");
    this.hiddenTrashButton();
  }

  //клонируем карточку
  _getTemplate() {
    return this._cardSelector.content.querySelector(".card").cloneNode(true);
  }
  //удаление значка корзины
  hiddenTrashButton() {
    this.isMyCard = this._ownerId === this._myId;
    this._deleteBtn.classList.toggle("card__trash_hidden", !this.isMyCard);
  }

  //лайк карточки changeColor
  _changeColorLike() {
    this._likeBtn.classList.toggle("card__like_active");
  }
  _setEventListeners() {
    //удаление
    this._deleteBtn.addEventListener("click", () => {
      this._handleDelete(this);
    });
    this._item
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._name, this._link)
      );
      this._likeBtn.addEventListener('click', ()=>
      this._handleLikeCard(this._data)
      );
  }

  getNewCard() {
    if(this.checkStatusLike()) {
      this._changeColorLike();
    }
    this._likeCount = this._item.querySelector(".card__count-like");
    this._setLikeCount(this._data.likes);
    const cardImg = this._item.querySelector(".card__image");
    this._setEventListeners();

    this._item.querySelector(".card__title").textContent = this._name; //текст
    cardImg.src = this._link; //картинка
    cardImg.alt = this._name; //название
    return this._item;
  }
 checkStatusLike() {
   return this._data.likes.some((item) => item._id === this._myId);
 }
 _setLikeCount() {
   this._likeCount.textContent = this._data.likes.length;
 }
 updateData(data) {
   this._data.likes = data.likes;
 }
 toggleLike() {
   this._setLikeCount();
   this._changeColorLike();
 }
 
  removeItem() {
    this._item.remove();
    this._item = null;
  }
}
export { Card };
