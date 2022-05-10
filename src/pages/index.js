import "./index.css";
import { Card } from "../components/cards.js";
import { Validate } from "../components/validate.js";
import { config, initialCards } from "../components/constants.js";
import { Section } from "../components/section.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";

// кнопка открытия попапа
const profileAddBtn = document.querySelector(".profile__add-button");
const profileBtnCard = document.querySelector(".profile__button-card");
//попап
// const popupProfile = document.querySelector(".popup-profile");
// const popupCard = document.querySelector(".popup-card");
//кнопка закрытие попапа
// const popupProfileClose = document.querySelector(".popup-profile__close");
// const popupCardClose = document.querySelector(".popup-card__close");
// const popupImgClose = document.querySelector(".popup-img__close");
//попап форма

const popupFormProfile = document.querySelector(".popup-profile__form");
const popupFormAdd = document.querySelector(".popup-card__form");
//заполнение инпутов
const inputName = document.querySelector(".popup-profile__text_type_name");
const inputJob = document.querySelector(".popup-profile__text_type_job");
//const inputTitle = document.querySelector(".popup-card__text_type_title");
//const inputLink = document.querySelector(".popup-card__text_type_link");
// из профайла
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
//шаблон карточки
//const cardTemplate = document.querySelector(".card-template").content;
//элемент шаблона карточки
//const cards = document.querySelector(".cards");
//попап картинки
const popupImage = document.querySelector(".popup-img");
//большое фото попап
//const bigImg = document.querySelector(".popup-img__photo");
//подпись к картинке
//const imgCaption = document.querySelector(".popup-img__caption");
const cardImg = document.querySelector(".card__image");

const profileValidate = new Validate(config, popupFormProfile);
const newCardValidate = new Validate(config, popupFormAdd);
const userInfo = new UserInfo({ name: ".profile__name", job: ".profile__job" });
const popupImg = new PopupWithImage(".popup-img");

//создаем и добавляем карточки и из массива и добавленные пользователям
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, handleCardClick);
      const element = card.getNewCard();
      cardList.addItem(element);
    },
  },
  ".cards"
);
cardList.renderItem();

//создание попап профайла
const handleProfile = new PopupWithForm(".popup-profile", (data) => {
  userInfo.setUserInfo(data);
});

//создание карточки попапа добавления карточки
const handleCard = new PopupWithForm(".popup-card", (data) => {
  const card = new Card(data.place, data.link, handleCardClick);
  const element = card.getNewCard();
  cardList.addItem(element);
});

//открытие большого попапа
function handleCardClick(name, link) {
  popupImg.open({ name, link });
}

handleProfile.setEventListeners();
handleCard.setEventListeners();
popupImg.setEventListeners();

//Слушатель попапа добавлеия карточки
profileAddBtn.addEventListener("click", function () {
  handleProfile.open();
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  profileValidate.closeErrorMessage();
});

//Слушатель попапа добавлеия карточки
profileBtnCard.addEventListener("click", function () {
  handleCard.open();
  inputTitle.value = "";
  inputLink.value = "";
  newCardValidate.closeErrorMessage();
  newCardValidate.disabledBtn();
});

profileValidate.enableValidation();
newCardValidate.enableValidation();
