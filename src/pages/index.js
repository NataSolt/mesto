import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { config } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/Api.js"
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
const userInfo = new UserInfo({ name: ".profile__name", about: ".profile__job", avatar: ".profile__avatar" });
const popupImg = new PopupWithImage(".popup-img");

//открытие большого попапа
function handleCardClick(name, link) {
  popupImg.open({ name, link });
}

//Слушатель попапа добавлеия карточки
profileAddBtn.addEventListener("click", function () {
  const info = userInfo.getUserInfo();

  inputName.value = info.name;
  inputJob.value = info.about;
  profileValidate.closeErrorMessage();
  handleProfile.open();
});

profileValidate.enableValidation();
newCardValidate.enableValidation();
avatarValidate.enableValidation();
//--------------------------------------------------------

// btnTrash = document.querySelectorAll(".card__trash");
// const hendleDelite = new PopupWithForm (".popup-delite")
// hendleDelite .setEventListeners();
// btnTrash.addEventListener('click', function() {
//   hendleDelite.open();
// })

// const apiUser = new Api({
//   url:"https://nomoreparties.co/v1/cohort-41/users/me", 
//   headers:{
//   "Content-Type": "application/json",
//   "authorization": "32ffaefa-9d9c-436d-9639-a2500716ba37"},
// })

const apiCards = new Api({
  url:"https://mesto.nomoreparties.co/v1/cohort-41", 
  headers:{
  
  authorization: "32ffaefa-9d9c-436d-9639-a2500716ba37",
  "Content-Type": "application/json"}
  
});
function uploadingChanges(isLoading, element, content) {
  if (isLoading) {
    element.textContent = 'Сохранение...'
  } else {
    element.textContent = content
  }
}

// Promise.all([apiCards.getUsers(), apiCards.getCards()])
//   .then(([userData, cardsData])=>{

//     userInfo.setUserInfo(userData);
//     userInfo.userId = userData._id
    
//     section.data = cardsData;
//     section.renderItems();

//   })
//   .catch((err) => alert(err))
// const cardList = new Section({
//     renderer: (newCardElement) => {
//       createCard(newCardElement);
//     },
//   },
//   ".cards"
// )
 
// const cardList = new Section(
//   {
//     renderer: (item) => {
//       createCard(item);
//     },
//   },
//   ".cards"
// );
//cardList.renderItem();

// return cardList;


function createCard(item) {
  const card = new Card(item, ".card-template", handleCardClick);
  const element = card.getNewCard();
  cardList.addItem(element);
  
}
//создаем и добавляем карточки и из массива и добавленные пользователям
const cardList = new Section(
  {
    renderer: (item) => {
      createCard(item);
    },
  },
  ".cards"
)
// const createCard = (item) => {
//   const card = new Card(item, myId, ".template-item", {
//     handleCardClick: () => {
//       popupWithImage.open(item);
//     },
//     handleDelIconClick: (data) => {
//       confirmDelCard.open(data);
//     },
//     handleLikeClick: (callbackCard) => {
//       api
//         .toggleLike(callbackCard._id, card.checkStatusLike())
//         .then((newCard) => {
//           card.updateData(newCard);
//           card.toggleLike();
//         })
//         .catch((err) => console.log(err));
//     },
//   });
//   const cardElement = card.generateCard();
//   cardList.addItem(cardElement);
// };
let myId = "";
//добавление массива
apiCards.getAllPromise()
.then(([getCards, getUsers]) => {
  myId = getUsers._id;
    userInfo.setUserInfo(getUsers);
    cardList.renderItem(getCards);
}).catch((err) => alert(err));



//добавление карточки
const handleCard = new PopupWithForm(".popup-card",(data) => {
  apiCards.postCard(data)
  .then((data) => {
    createCard(data);
  handleCard.close();
  })
  //.then(createCard.renderItem(data))
  //cardList.addItem(data)
    .catch((err) => {
      alert(err);
})

});

//Слушатель попапа добавлеия карточки
profileBtnCard.addEventListener("click", function () {
  newCardValidate.closeErrorMessage();
  newCardValidate.disabledBtn();
  handleCard.open();
});

const handleAvatar = new PopupWithForm(".popup-avatar",(data) => {
 apiCards.patchAvatar(data)
  .then(data => {userInfo.setAvatarInfo(data)
    handleAvatar.close();
  })
  .catch((err) => {
    alert(err);
})})

handleAvatar.setEventListeners();
btnAvatar.addEventListener("click", function () {
  avatarValidate.closeErrorMessage();
  // newCardValidate.closeErrorMessage();
  // newCardValidate.disabledBtn();
  handleAvatar.open();
});


//создание попап профайла
const handleProfile = new PopupWithForm(".popup-profile", (data) => {
  apiCards.patchUsers(data)
  .then(data => {userInfo.setUserInfo(data)
    handleProfile.close()}
)
.catch((err) => {
    alert(err);
})
  
});
handleAvatar.setEventListeners();
handleProfile.setEventListeners();
handleCard.setEventListeners();
popupImg.setEventListeners();



