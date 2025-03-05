//КОНФИГ ЗАПРОСА
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "86ff260a-b20f-47f6-837c-f13a2bbb97e2",
    "Content-Type": "application/json",
  },
};

//ФУНКЦИЯ ПРЕОБРАЗОВАНИЯ В JSON
function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

//ЗАГРУЗКА КАРТОЧЕК С СЕРВЕРА
const getCards = () => {
  return fetch(config.baseUrl + "/cards", {
    headers: config.headers,
  }).then(getResponseData)
  .catch((error) => {
    console.error('Ошибка при загрузке карточек:', error);
  });
};

//ЗАГРУЗКА ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ С СЕРВЕРА
const getInformation = () => {
  return fetch(config.baseUrl + "/users/me", {
    headers: config.headers,
  }).then(getResponseData)
  .catch((error) => {
    console.error('Ошибка при загрузке информации:', error);
  });
};

//ОТПРАВЛЕНИЕ НОВОЙ КАРТОЧКИ НА СЕРВЕР
const sendingCard = async (name, link) => { 
  try {
    const res = await fetch(config.baseUrl + "/cards", { 
      method: "POST", 
      headers: config.headers, 
      body: JSON.stringify({ 
        name: name, 
        link: link, 
      }), 
    });
    return await getResponseData(res);
  } catch (error) {
    console.error('Ошибка при отправке карточки:', error);
  }
}; 


//ОТПРАВЛЕНИЕ ИМЕНИ И ЗАНЯТИЯ О ПОЛЬЗОВАТЕЛЕ НА СЕРВЕР
const sendingInformation = async (name, about) => { 
  try {
    const res = await fetch(config.baseUrl + "/users/me", { 
      method: "PATCH", 
      headers: config.headers, 
      body: JSON.stringify({ 
        name: name, 
        about: about, 
      }), 
    });
    return await getResponseData(res);
  } catch (error) {
    console.error('Ошибка при отправке информации:', error);
  }
}; 

//ОТПРАВЛЕНИЕ АВАТАРА ПОЛЬЗОВАТЕЛЯ
const sendingAvatar = async (avatar) => { 
  try {
    const res = await fetch(config.baseUrl + "/users/me/avatar", { 
      method: "PATCH", 
      headers: config.headers, 
      body: JSON.stringify({ 
        avatar: avatar, 
      }), 
    });
    return await getResponseData(res);
  } catch (error) {
    console.error('Ошибка при отправке аватара:', error);
  }
}; 

//УДАЛЕНИЕ КАРТОЧКИ С СЕРВЕРА
const deleteCard = async (cardId) => { 
  try {
    const res = await fetch(config.baseUrl + `/cards/${cardId}`, { 
      method: "DELETE", 
      headers: config.headers, 
    });
    return await getResponseData(res);
  } catch (error) {
    console.error('Ошибка при удалении карточки:', error);
  }
}; 

//ДОБАВЛЕНИЕ ЛАЙКА НА СЕРВЕР
const addLike = async (cardId) => { 
  try {
    const res = await fetch(config.baseUrl + `/cards/likes/${cardId}`, { 
      method: "PUT", 
      headers: config.headers, 
    });
    return await getResponseData(res);
  } catch (error) {
    console.error('Ошибка при добавлении лайка:', error);
  }
}; 

//УДАЛЕНИЕ ЛАЙКА С СЕРВЕРА
const deleteLike = async (cardId) => {
  try {
    const res = await fetch(config.baseUrl + `/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    });
    return await getResponseData(res);
  } catch (error) {
    console.error('Ошибка при удалении лайка:', error);
  }
};

export { getCards, getInformation, sendingInformation, sendingAvatar, sendingCard, deleteCard, addLike, deleteLike };
