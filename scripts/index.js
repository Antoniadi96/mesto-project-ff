import { initialCards } from './cards.js';

// @todo: Темплейт карточки

const cardTemplate = document.getElementById('card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(initialCard, deleteCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true); 
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardDeleteButton = card.querySelector('.card__delete-button');

    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    cardTitle.textContent = initialCard.name;

    cardDeleteButton.addEventListener('click', function() { 
        deleteCard(card); 
    })

    return card;
}

// @todo: Функция удаления карточки

function deleteCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(initialCard) {
    const cardElement = createCard(initialCard, deleteCard);
    placesList.append(cardElement);
});