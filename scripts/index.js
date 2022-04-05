// кнопка открытия попапа
const popup = document.querySelectorAll(".popup");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileBtnCard = document.querySelector(".profile__button-card");
//попап
const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-card");
const popupImg = document.querySelector(".card-img");
//кнопка закрытие попапа
const popupProfileClose = document.querySelector(".popup-profile__close");
const popupCardClose = document.querySelector(".popup-card__close");
const popupImgClose = document.querySelector(".popup-img__close");
//попап форма
const popupFormProfile = document.querySelector(".popup-profile__form");
const popupFormAdd = document.querySelector(".popup-card__form");
//заполнение инпутов
const inputName = document.querySelector(".popup-profile__text_type_name");
const inputJob = document.querySelector(".popup-profile__text_type_job");
const inputTitle = document.querySelector(".popup-card__text_type_title");
const inputLink = document.querySelector(".popup-card__text_type_link");
// из профайла
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
//шаблон карточки
const cardTemplate = document.querySelector(".card-template").content;
//элемент шаблона карточки
const cards = document.querySelector(".cards");
//попап картинки
const popupImage = document.querySelector(".popup-img");
//большое фото попап
const bigImg = document.querySelector(".popup-img__photo");
//подпись к картинке
const imgCaption = document.querySelector(".popup-img__caption");

//создание карточки----------------------------------------------------------------
function renderCard(cardName, cardLink) {
  //шаблон карточки
  const cardTemplate = document.querySelector(".card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true); //клонируем
  const cardImg = card.querySelector(".card__image");
  card.querySelector(".card__title").textContent = cardName; //текст
  cardImg.src = cardLink; //картинка
  cardImg.alt = cardName; //название
  //лайк
  card.querySelector(".card__like").addEventListener("click", likeCard);
  //удаление
  card.querySelector(".card__trash").addEventListener("click", removeCard);
  // слушатель открытие попапа с картинкой
  cardImg.addEventListener("click", openImg);
  return card;
}

//отображение карточек из массива
initialCards.forEach((card) => {
  cards.append(renderCard(card.name, card.link));
});

//переключение состояний значка "лайк"
function likeCard(event) {
  const card = event.target;
  card.classList.toggle("card__like_active");
}
//удаление карточки
function removeCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

//отправка формы профайл попапа
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
}

//отправка формы карточки
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  cards.prepend(renderCard(inputTitle.value, inputLink.value));
  closePopup(popupCard);
  evt.currentTarget.reset();
}

// открытие попапа картинки
function openImg(event) {
  imgCaption.textContent = event.target.alt;
  bigImg.src = event.target.src;
  bigImg.alt = event.target.alt;
  openPopup(popupImage);
}

//фукция попапа редактирования
function handleProfileAddBtnClick() {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

//фукция попапа карточки
function handleProfileBtnCardClick() {
  openPopup(popupCard);
  inputTitle.value = "";
  inputLink.value = "";
}

//функция попапа закрытия профайла
function handleProfileCloseClick() {
  closePopup(popupProfile);
}

//функция закрытие попапа карточки
function handlePopupCardCloseClick() {
  closePopup(popupCard);
}

//функция закрытие попапа картинки
function handlePopupImgCloseClick() {
  closePopup(popupImage);
}

//слушатель отправки формы карточки
popupFormAdd.addEventListener("submit", addCardSubmitHandler);
//слушатель  отправки профайл попапа
popupFormProfile.addEventListener("submit", handleProfileFormSubmit);
//слушатель открытия попапа редактирования
profileAddBtn.addEventListener("click", handleProfileAddBtnClick);
//слушатель открытия попапа карточки
profileBtnCard.addEventListener("click", handleProfileBtnCardClick);
//слушатель попапа закрытия профайла
popupProfileClose.addEventListener("click", handleProfileCloseClick);
//слушатель закрытие попапа карточки
popupCardClose.addEventListener("click", handlePopupCardCloseClick);
//слушатель закрытие попапа картинки
popupImgClose.addEventListener("click", handlePopupImgCloseClick);

//слушатель закрытие попапов escape
const closePopupEsc = (popup) => {
  document.removeEventListener("keydown", handleEscUp); // удаляем событие keydown
  popup.classList.remove("popup_opened"); // скрываем попап
};
// И дальше внутри коллбэка у нас есть объект event и мы можем узнать в каком месте произошел клик:
const handleEscUp = (evt) => {
  //evt.preventDefault();
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopupEsc(activePopup);
  }
};

//попапы открытие
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscUp);
};

//попапы закрытие
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  closeErrorMessage();
}

//функция закрытия попап картинки на оверлее
popupImage.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    // закрываем только тогда, когда надо, т.е. только при том клике, которые происходит по нужному элементу
    closePopup(popupImage);
  }
});

//функция закрытия попап профайл на оверлее
popupProfile.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    // закрываем только тогда, когда надо, т.е. только при том клике, которые происходит по нужному элементу
    closePopup(popupProfile);
  }
});

//функция закрытия попап кард на оверлее
popupCard.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    // закрываем только тогда, когда надо, т.е. только при том клике, которые происходит по нужному элементу
    closePopup(popupCard);
  }
});

//очищение сообщения об ошибке
function closeErrorMessage() {
  const errorMessage = document.querySelectorAll(".popup__input-error_active");
  errorMessage.forEach((item) => {
    item.textContent = "";
    item.classList.remove("popup__input-error_active");
  });
  const errorBorder = document.querySelectorAll(".popup__border-error");
  errorBorder.forEach((item) => {
    item.classList.remove("popup__border-error");
  });
}
