let profileAddButton = document.querySelector(".profile__add-button");
let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close");
let popupContainer = document.querySelector(".popup__form");
let inputName = document.querySelector(".popup__text_type_name");
let inputJob = document.querySelector(".popup__text_type_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

function addPopup() {
  popup.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function removePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  removePopup();
}

closePopupButton.addEventListener("click", removePopup);
profileAddButton.addEventListener("click", addPopup);
popupContainer.addEventListener("submit", formSubmitHandler);
