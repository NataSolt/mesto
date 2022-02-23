let profileAddButton = document.querySelector(".profile__add-button");
let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close");
let popupContainer = document.querySelector(".popup__container");
let inputName = document.querySelector(".popup__name");
let inputJob = document.querySelector(".popup__job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

profileAddButton.addEventListener("click", addPopup);
function addPopup() {
  popup.classList.add("popup_opened");
}

closePopupButton.addEventListener("click", removePopup);
function removePopup() {
  popup.classList.remove("popup_opened");
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  removePopup();
}

popupContainer.addEventListener("submit", formSubmitHandler);
