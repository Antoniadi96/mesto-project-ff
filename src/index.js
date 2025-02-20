import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';

//Константы 
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImageType = document.querySelector('.popup_type_image');
const popupImage = popupImageType.querySelector('.popup__image');
const popupImageCaption = popupImageType.querySelector('.popup__caption');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditNameInput = popupEdit.querySelector('.popup__input_type_name');
const popupEditDescriptinput = popupEdit.querySelector('.popup__input_type_description');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardNameInput = popupNewCard.querySelector('.popup__input_type_card-name'); 
const popupNewCardLinkInput = popupNewCard.querySelector('.popup__input_type_url'); 

//Колбек изображения
const openImagePopup = function(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
  openModal(popupImageType);
}

//Создание карточки
initialCards.forEach(function(item) {
  placesList.append(createCard(item, deleteCard, likeCard, openImagePopup));
})

//Открытие и закрытие попапа для создания карточки
const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function() {
  openModal(popupNewCard);
})

const popupAddCloseButton = popupNewCard.querySelector('.popup__close');
popupAddCloseButton.addEventListener('click', function() {
  closeModal(popupNewCard);
})

//Функция создания новой карточки
function addCard() { 
  const cardData = {
    name: popupNewCardNameInput.value, 
    link: popupNewCardLinkInput.value
  }
  placesList.prepend(createCard(cardData, deleteCard, likeCard, openImagePopup))
}

//Кнопка сохранить при создании новой карточки
const popupFormCard = popupNewCard.querySelector('.popup__form');
popupFormCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  addCard();
  popupFormCard.reset();
  closeModal(popupNewCard);
});

//Закрытие попапа с изображением
const popupImageCloseButton = popupImageType.querySelector('.popup__close');
popupImageCloseButton.addEventListener('click', function() {
  closeModal(popupImageType);
});
 
//Открытие и закрытие попапа для изменения имени
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function() {
  popupEditNameInput.value = profileTitle.textContent;
  popupEditDescriptinput.value = profileDescription.textContent;
  openModal(popupEdit);
});

const popupEditCloseButton = popupEdit.querySelector('.popup__close');
popupEditCloseButton.addEventListener('click', function() {
  closeModal(popupEdit);
});

//Функция для изменения имени
function updateProfileInfo() {
  profileTitle.textContent = popupEditNameInput.value;
  profileDescription.textContent = popupEditDescriptinput.value;
}

//Кнопка изменить в редактирование имени
const popupFormEdit = popupEdit.querySelector('.popup__form');
popupFormEdit.addEventListener('submit', function(evt) {
  evt.preventDefault();
  updateProfileInfo();
  closeModal(popupEdit);
});


