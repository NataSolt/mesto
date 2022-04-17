//объект
const config = {
  form: ".popup-form",
  input: ".popup-input",
  submitButton: ".popup__submit",
  inactiveButton: "popup__button_inactive",
  inputError: "popup__border-error",
  spanError: "popup__input-error_active"
};

class Validate {
  constructor(setting, form) {
    this._form = form;
    this._input = setting.input;
    this._submitButton = setting.submitButton;
    this._inactiveButton = setting.inactiveButton;
    this._inputError = setting.inputError;
    this._spanError = setting.spanError;
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._buttonElement = this._form.querySelector(this._submitButton);
  }

  //показать ошибку
  _showInputError = (inputElement, validationMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._spanError);
  };
  //спрятать сообщение об ошибке
  _hideInputError = (inputElement) => {
    // Находим элемент ошибки
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._spanError);
    errorElement.textContent = "";
  };

  //проверяет есть ошибка или нет
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = (inputList) => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._inactiveButton);
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButton);
    }
  };

  _setEventListeners = (form) => {
    this._toggleButtonState();
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  // Функция принимает массив полей
  _hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };

  // функция блокирования кнопки попапа карточки при открытии
  disabledBtn() {
    const popupSubmitCard = this._form.querySelector(".popup__submit-card");
    popupSubmitCard.setAttribute("disabled", true);
    popupSubmitCard.classList.add(this._inactiveButton);
  }

  //очищение сообщения об ошибке
  closeErrorMessage() {
    const errorMessage = this._form.querySelectorAll(
      ".popup__input-error_active"
    );
    errorMessage.forEach((item) => {
      item.textContent = "";
      item.classList.remove(this._spanError);
    });
    const errorBorder = this._form.querySelectorAll(".popup__border-error");
    errorBorder.forEach((item) => {
      item.classList.remove(this._inputError);
    });
  }
}

export { Validate, config };
