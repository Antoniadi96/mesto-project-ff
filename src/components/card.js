import { deleteCard, addLike, deleteLike } from "./api";
const cardTemplate = document.querySelector("#card-template").content;

// Функция для создания и удаления карточек из массива
const createCard = (
  card,
  deleteCardCall,
  likeCardCall,
  openFullImage,
  userId
) => {
  try {
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

    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const cardLikesAmount = cardElement.querySelector(".card__likes-amount");
    cardLikesAmount.textContent = card.likes.length;
    const isUserLike = card.likes.some((item) => {
      return item._id === userId;
    });
    if (isUserLike) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
    
    // Передаем дополнительные параметры в коллбек
    cardLikeButton.addEventListener("click", (event) => {
      likeCardCall(event, card._id, cardLikeButton, cardLikesAmount);
    });

    const cardImageButton = cardElement.querySelector(".card__image");
    cardImageButton.addEventListener("click", openFullImage);

    return cardElement;
  } catch (error) {
    console.error('Ошибка при создании карточки:', error);
  }
};

// Колбек удаления
const removeCard = function (event, cardId) {
  const cardOne = event.target.closest(".places__item");
  deleteCard(cardId)
    .then((result) => {
      cardOne.remove();
    })
    .catch((error) => {
      console.error('Ошибка при удалении карточки:', error);
    });
};

// Колбек лайка с новыми параметрами
const likeCard = function (event, cardId, likeButton, likesCounter) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((res) => {
        likeButton.classList.remove("card__like-button_is-active");
        likesCounter.textContent = res.likes.length;
      })
      .catch((error) => {
        console.error('Ошибка при удалении лайка:', error);
      });
  } else {
    addLike(cardId)
      .then((res) => {
        likeButton.classList.add("card__like-button_is-active");
        likesCounter.textContent = res.likes.length;
      })
      .catch((error) => {
        console.error('Ошибка при добавлении лайка:', error);
      });
  }
};

export { createCard, removeCard, likeCard };