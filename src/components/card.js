const cardTemplate = document.querySelector('#card-template').content;

//Функция для создания и удаления карточек из массива
const createCard = (card, deleteCardCall, likeCardCall, openFullImage) => {
  const cardElement= cardTemplate.querySelector(".card").cloneNode(true); 
  const cardImage =  cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', deleteCardCall);

  const cardlikeButton = cardElement.querySelector('.card__like-button');
  cardlikeButton.addEventListener('click', likeCardCall);

  const cardimageButton = cardElement.querySelector('.card__image');
  cardimageButton.addEventListener('click', openFullImage);

  return cardElement; 
}

//Колбек удаления
const deleteCard = function(event) {
  event.target.closest('.places__item').remove()
}
 
//Колбек лайка
const likeCard = function(event) {
  event.target.classList.toggle('card__like-button_is-active')
}

export { createCard, deleteCard, likeCard };