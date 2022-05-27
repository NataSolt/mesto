import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { config } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupDeleteCard } from "../components/PopupDeleteCard";
// кнопка открытия попапа
const btnAvatar = document.querySelector(".profile__avatar-container");
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
const popupFormAvatar = document.querySelector(".popup-avatar__form");
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

const avatarValidate = new FormValidator(config, popupFormAvatar);
const profileValidate = new FormValidator(config, popupFormProfile);
const newCardValidate = new FormValidator(config, popupFormAdd);
const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__job",
  avatar: ".profile__avatar",
});
const popupImg = new PopupWithImage(".popup-img");

//открытие большого попапа
function handleCardClick(name, link) {
  popupImg.open({ name, link });
}

profileValidate.enableValidation();
newCardValidate.enableValidation();
//avatarValidate.enableValidation();
//--------------------------------------------------------
const apiCards = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "32ffaefa-9d9c-436d-9639-a2500716ba37",
    "Content-Type": "application/json",
  },
});
function saveChange(isLoading, element, content) {
  if (isLoading) {
    element.textContent = "Сохранение...";
  } else {
    element.textContent = content;
  }
}

//попап подтверждения удаления
const handleDeleteCard = new PopupDeleteCard(".popup-delete", {
  handleDeleteItem: (card) => {
    apiCards
      .deleteCard(card._cardId)
      .then(() => {
        card.removeItem();
        handleDeleteCard.close();
      })
      .catch((arr) => alert(arr))
  },
});
handleDeleteCard.setEventListeners();

const createCard = (item) => {
  const card = new Card(
    item,
    userId,
    ".card-template",
    handleCardClick,
    {
      handleDelete: (card) => {
        handleDeleteCard.open(card);
      },
    },
    {
      handleLikeCard: (callbackCard) => {
        apiCards
          .toggleLike(callbackCard._id, card.checkStatusLike())
          .then((newCard) => {
            card.updateData(newCard);
            card.toggleLike(callbackCard._id, card.checkStatusLike());
          })
          .catch((arr) => alert(arr));
      },
    }
  );
  const element = card.getNewCard();
  cardList.addItem(element);
};
//создаем и добавляем карточки и из массива и добавленные пользователям
const cardList = new Section(
  {
    renderer: (item) => {
      createCard(item);
    },
  },
  ".cards"
);
let userId = "";
//добавление массива
apiCards
  .getAllPromise()
  .then(([getCards, getUsers]) => {
    userId = getUsers._id;
    userInfo.setUserInfo(getUsers);
    cardList.renderItem(getCards.reverse());
  })
  .catch((err) => alert(err));

//добавление карточки
const handleCard = new PopupWithForm(".popup-card", (data) => {
  saveChange(true, handleCard.submitButton);
  apiCards
    .postCard(data)
    .then((data) => {
      createCard(data);
      handleCard.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => saveChange(false, handleCard.submitButton, "Сохранить"));
});

//Слушатель попапа добавлеия карточки
profileAddBtn.addEventListener("click", function () {
  const info = userInfo.getUserInfo();
  inputName.value = info.name;
  inputJob.value = info.about;
  profileValidate.closeErrorMessage();
  handleProfile.open();
});

//Слушатель попапа добавлеия карточки
profileBtnCard.addEventListener("click", function () {
  newCardValidate.closeErrorMessage();
  newCardValidate.disabledBtn();
  handleCard.open();
});
//---------------------------------------
const handleAvatar = new PopupWithForm(".popup-avatar", (data) => {
  saveChange(true, handleAvatar.submitButton);
  apiCards
    .patchAvatar(data)
    .then((data) => {
      userInfo.setAvatarInfo(data);
      handleAvatar.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => saveChange(false, handleAvatar.submitButton, "Сохранить"));
});

handleAvatar.setEventListeners();

btnAvatar.addEventListener("click", function () {
  //avatarValidate.closeErrorMessage();
  // newCardValidate.closeErrorMessage();
  // newCardValidate.disabledBtn();
  handleAvatar.open();
});
//--------------------------------------
//создание попап профайла
const handleProfile = new PopupWithForm(".popup-profile", (data) => {
  saveChange(true, handleProfile.submitButton);
  apiCards
    .patchUsers(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      handleProfile.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => saveChange(false, handleProfile.submitButton, "Сохранить"));
});
handleProfile.setEventListeners();
handleCard.setEventListeners();
popupImg.setEventListeners();
