import './pages/index.css';

// Импорты компонентов
import { createCard, removeCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { validationConfig } from './components/validationConfig';
import { 
 getCards, 
 getInformation, 
 sendingInformation, 
 sendingAvatar, 
 sendingCard 
} from "./components/api";

// Константы для элементов профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Константы для модального окна изображения
const popupImageType = document.querySelector('.popup_type_image');
const popupImage = popupImageType.querySelector('.popup__image');
const popupImageCaption = popupImageType.querySelector('.popup__caption');

// Константы для модального окна редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditNameInput = popupEdit.querySelector('.popup__input_type_name');
const popupEditDescriptinput = popupEdit.querySelector('.popup__input_type_description');

// Константы для модального окна добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardNameInput = popupNewCard.querySelector('.popup__input_type_card-name');
const popupNewCardLinkInput = popupNewCard.querySelector('.popup__input_type_url');

// Константы для модального окна аватара
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarInput = popupAvatar.querySelector('.popup__input_type_url');

// Основной контейнер для карточек
const placesList = document.querySelector('.places__list');

// Экспортируемые переменные
export { placesList, openImagePopup, profileTitle, profileDescription, profileImage };

// Инициализация валидации
enableValidation(validationConfig);

// Идентификатор пользователя
let userId;

// Добавлоения модификатора
const popuplist = document.querySelectorAll('.popup');
popuplist.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

// Функция для отображения процесса загрузки
function renderLoading(popupSubmit, isLoading) {
  if(isLoading) {
    popupSubmit.textContent = 'Сохранение...'
  }
  else {
    popupSubmit.textContent = 'Сохранить'
  }
}

// Колбек изображения
const openImagePopup = function(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
  openModal(popupImageType);
}

// Открытие и закрытие попапа для создания карточки
const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function() {
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
})

const popupAddCloseButton = popupNewCard.querySelector('.popup__close');
popupAddCloseButton.addEventListener('click', function() {
  closeModal(popupNewCard);
})

// Кнопка сохранить при создании новой карточки
const popupFormCard = popupNewCard.querySelector('.popup__form');
const popupFormCardButton = popupFormCard.querySelector('.popup__button');
popupFormCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  renderLoading(popupFormCardButton, true);
  sendingCard(popupNewCardNameInput.value, popupNewCardLinkInput.value)
    .then((response) => {
      placesList.prepend(
        createCard(response, removeCard, likeCard, openImagePopup, userId)
      );
      popupFormCard.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(popupFormCardButton, false);
    });
});

// Закрытие попапа с изображением
const popupImageCloseButton = popupImageType.querySelector('.popup__close');
popupImageCloseButton.addEventListener('click', function() {
  closeModal(popupImageType);
});
 
// Открытие и закрытие попапа для изменения имени
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function() {
  popupEditNameInput.value = profileTitle.textContent;
  popupEditDescriptinput.value = profileDescription.textContent;
  clearValidation(popupEdit, validationConfig);
  openModal(popupEdit);
});

const popupEditCloseButton = popupEdit.querySelector('.popup__close');
popupEditCloseButton.addEventListener('click', function() {
  closeModal(popupEdit);
});

// Кнопка изменить в редактирование имени
const popupFormEdit = popupEdit.querySelector('.popup__form');
const popupFormEditButton = popupFormEdit.querySelector('.popup__button');
popupFormEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(popupFormEditButton, true);
  sendingInformation(
    popupEditNameInput.value,
    popupEditDescriptinput.value
  )
    .then((response) => {
      profileTitle.textContent = response.name;
      profileDescription.textContent = response.about;
      closeModal(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(popupFormEditButton, false);
    });
});

// Открытие и закрытие попапа аватара
const profileAvatarButton = document.querySelector('.profile__image');
profileAvatarButton.addEventListener('click', function () {
  clearValidation(popupAvatar, validationConfig);
  openModal(popupAvatar);
});

const profileAvatarCloseButton = popupAvatar.querySelector('.popup__close');
profileAvatarCloseButton.addEventListener('click', function () {
  closeModal(popupAvatar);
});

// Кнопка сохранить в попапе для аватара
const popupFormAvatar = popupAvatar.querySelector('.popup__form');
const popupFormAvatarButton = popupFormAvatar.querySelector('.popup__button');
popupFormAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(popupFormAvatarButton, true);
  sendingAvatar(popupAvatarInput.value)
    .then((response) => {
      profileImage.setAttribute(
        "style",
        `background-image: url('${response.avatar}')`
      );
      popupFormAvatar.reset();
      closeModal(popupAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(popupFormAvatarButton, false);
    });
});

// Получение данных пользователя и карточек
Promise.all([getInformation(), getCards()])
  .then((result) => {
    profileImage.setAttribute(
      "style",
      `background-image: url('${result[0].avatar}')`
    );
    profileTitle.textContent = result[0].name;
    profileDescription.textContent = result[0].about;
    userId = result[0]._id;
    result[1].forEach(function (item) {
      placesList.append(
        createCard(item, removeCard, likeCard, openImagePopup, userId)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

