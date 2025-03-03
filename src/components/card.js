import { deleteCard, addLike, deleteLike } from "./api";
const cardTemplate = document.querySelector("#card-template").content;

//Функция для создания и удаления карточек из массива
const createCard = (
  card,
  deleteCardCall,
  likeCardCall,
  openFullImage,
  userId
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  if (userId === card.owner._id) {
    cardDeleteButton.addEventListener("click", (event) => {
      deleteCardCall(event, card._id);
    });
  } else {
    cardDeleteButton.remove();
  }

  const cardlikeButton = cardElement.querySelector(".card__like-button");
  const cardLikesAmount = cardElement.querySelector(".card__likes-amount");
  cardLikesAmount.textContent = card.likes.length;
  const isUserLike = card.likes.some((item) => {
    return item._id === userId;
  });
  if (isUserLike) {
    cardlikeButton.classList.add("card__like-button_is-active");
  }
  cardlikeButton.addEventListener("click", (event) => {
    likeCardCall(event, card._id);
  });

  const cardimageButton = cardElement.querySelector(".card__image");
  cardimageButton.addEventListener("click", openFullImage);

  return cardElement;
};

//Колбек удаления
const removeCard = function (event, cardId) {
  const cardOne = event.target.closest(".places__item");
  deleteCard(cardId)
    .then((result) => {
      cardOne.remove();
    })
    .catch((err) => console.log(err));
};

//Колбек лайка
const likeCard = function (event, cardId) {
  const cardOne = event.target.closest(".places__item");
  const counterLikes = cardOne.querySelector(".card__likes-amount");
  if (event.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId).then((res) => {
      event.target.classList.remove("card__like-button_is-active");
      counterLikes.textContent = res.likes.length;
    });
  } else {
    addLike(cardId).then((res) => {
      event.target.classList.add("card__like-button_is-active");
      counterLikes.textContent = res.likes.length;
    });
  }
};

export { createCard, removeCard, likeCard };
