const cardTemplate = document.querySelector('#card-template').content;

//Функция для создания и удаления карточек из массива
const createCard = (initialCard, deleteCardCall, likeCardCall, openFullImage) => {
  const card = cardTemplate.cloneNode(true);
  const cardImage =  card.querySelector('.card__image');
  card.querySelector('.card__title').textContent = initialCard.name;
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;

  const cardDeleteButton = card.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', deleteCardCall);

  const cardlikeButton = card.querySelector('.card__like-button');
  cardlikeButton.addEventListener('click', likeCardCall);

  const cardimageButton = card.querySelector('.card__image');
  cardimageButton.addEventListener('click', openFullImage);

  return card; 
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