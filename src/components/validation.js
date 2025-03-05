// Функция показа ошибки
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция скрытия ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.setCustomValidity("");
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
};

// Функция проверки валидации поля
const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// Функция проверки наличия полей с ошибками
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция блокировки кнопки отправки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Добавление обработчика всем полям
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Добавление обработчика всем формам
const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};
// Функция отключения кнопки отправки
const disableSubmitButton = (form, validationConfig) => {
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

// Функция очистки ошибок валидации
const clearValidation = (form, validationConfig) => {
  disableSubmitButton(form, validationConfig);
  const inputElements = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  inputElements.forEach((inputElement) => {
    hideInputError(form, inputElement, validationConfig);
  });
};

export { enableValidation, clearValidation };
