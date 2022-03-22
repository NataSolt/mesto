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

// кнопка открытия попапа
let popup = document.querySelectorAll(".popup");
let profileAddBtn = document.querySelector(".profile__add-button");
let profileBtnCard = document.querySelector(".profile__button-card");
let profileBtnImg = document.querySelector(".card__image");
//попап
let popupProfile = document.querySelector(".popup-profile");
let popupCard = document.querySelector(".popup-card");
let popupImg = document.querySelector(".card-img");
//кнопка закрытие попапа
let popupProfileClose = document.querySelector(".popup-profile__close");
let popupCardClose = document.querySelector(".popup-card__close");
let popupImgClose = document.querySelector(".popup-img__close");
//попап форма
let popupContainer = document.querySelector(".popup-profile__form");
let popupCardContainer = document.querySelector(".popup-card__form");
//заполнение инпутов
let inputName = document.querySelector(".popup-profile__text_type_name");
let inputJob = document.querySelector(".popup-profile__text_type_job");
let inputTitle = document.querySelector(".popup-card__text_type_title");
let inputLink = document.querySelector(".popup-card__text_type_link");
// из профайла
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
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

//попапы открытие
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
};

//попапы закрытие
function closePopup() {
  document.querySelector(".popup_opened").classList.remove("popup_opened");
}

//создание карточки----------------------------------------------------------------
function renderCard(cardName, cardLink) {
  //шаблон карточки
  const cardTemplate = document.querySelector(".card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true); //клонируем
  card.querySelector(".card__title").textContent = cardName; //текст
  card.querySelector(".card__image").src = cardLink; //картинка
  card.querySelector(".card__image").alt = cardName; //название
  //лайк
  card.querySelector(".card__like").addEventListener("click", likeCard);
  //удаление
  card.querySelector(".card__trash").addEventListener("click", removeCard);
  // слушатель открытие попапа с картинкой
  card.addEventListener("click", openImg);
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
function formSubmitHandler(evt) {
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
  imgCaption.textContent = event.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  bigImg.src = event.target.closest(".card__image").src;
  bigImg.alt = event.target.closest(".card__image").alt;
  openPopup(popupImage);
}

//слушатель отправки формы карточки
popupCardContainer.addEventListener("submit", addCardSubmitHandler);

//слушатели открытие,закрытия и отправки профайл попапа
popupContainer.addEventListener("submit", formSubmitHandler);

//слушатель попапа редактирования
profileAddBtn.addEventListener("click", function () {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});
//слушатель попапа карточки
profileBtnCard.addEventListener("click", function () {
  openPopup(popupCard);
});
//слушатель попапа закрытия профайла
popupProfileClose.addEventListener("click", function () {
  closePopup(popupProfile);
});
//слушатель закрытие попапа карточки
popupCardClose.addEventListener("click", function () {
  closePopup(popupCard);
});
//слушатель закрытие попапа картинки
popupImgClose.addEventListener("click", function () {
  closePopup(popupImg);
});
