//объект
const config = {
  form: ".popup-form",
  input: ".popup-input",
  submitButton: ".popup__submit",
  inactiveButton: "popup__button_inactive",
  inputError: "popup__border-error",
  spanError: "popup__input-error_active",
};

const showInputError = (
  formElement,
  inputElement,
  validationMessage,
  config
) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add(config.inputError);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(config.spanError);
};

const hideInputError = (formElement, inputElement, config) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove(config.inputError);
  errorElement.classList.remove(config.spanError);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, config);
  }
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(config.inactiveButton);
  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(config.inactiveButton);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(config.input));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(config.submitButton);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, config);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, config);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.form));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

// функция блокирования кнопки попапа карточки при открытии
function disabledBtn() {
  const popupSubmitCard = document.querySelector(".popup__submit-card");
  popupSubmitCard.setAttribute("disabled", true);
  popupSubmitCard.classList.add("popup__button_inactive");
}

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

// Вызовем функцию
enableValidation(config);
