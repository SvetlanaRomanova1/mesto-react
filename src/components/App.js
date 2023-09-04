import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import UpdateAvatarPopup from './UpdateAvatarPopup';
import DeletePopupCard from './DeletePopupCard';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../constexts/CurrentUserContext';


function App() {
  // Стейты открытия и закрытия попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  // Стейт currentUser, которое будет хранить информацию о пользователе
  const [currentUser, setCurrentUser] = useState({});
  // Стейт для хранения карточек
  const [cards, setCards] = useState([]);
// Стейт Ожидание загрузки
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // Получаем информацию о текущем пользователе при загрузке компонента
    api.getUserInfo()
      .then(userInfo => {
        setCurrentUser(userInfo);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  }, []);

  // Обработчики открытия попапов
  // Открытие попапа - Редактировать аватар
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

//Открытие попапа - Добавить место
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

// Открытие попапа - Редактировать профиль
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

// Открытие попапа - Удаление карточки
  function handleDeletePopupClick(card) {
    setDeleteCard(card);
  }

  // Обработчик клика по карточке для открытия попапа с изображением
  function handleCardClick(card) {
    setSelectedCard(card);
  }

// Обработчик управления лайками
  function handleCardLike(e, card) {
    e.preventDefault();
    e.stopPropagation();
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api.likeCardRemove(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    } else {
      api.likeCardAdd(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    }
  }

  // Обработчик удаления карточки
  function handleCardDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    // Установка isPending в true перед отправкой запроса
    setIsPending(true);

    e.preventDefault();
    api.deleteCard(deleteCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deleteCard._id));
        // Закрываем модальные окна
        closeAllPopups();
        // Установка isPending в false после успешного запроса
        setIsPending(false);
      })
      .catch(error => {
        console.error('Error deleting card:', error);
      });
  }

  // Обработчик формы - Редактировать профиль
  function handleUpdateUser(updatedUserInfo) {
    // Установка isPending в true перед отправкой запроса
    setIsPending(true);

   // Вызов API для редактирования информации о пользователе
    api.editUserInfo(updatedUserInfo)
      .then((result) => {
        setCurrentUser(result);
        // Закрываем модальные окна
        closeAllPopups();
   // Установка isPending в false после успешного запроса
        setIsPending(false);
      })
      .catch((error) => {
        console.error('Error updating user info:', error);
      });
  }

  // Обработчик формы - Обновить аватар
  function handleUpdateAvatar(onUpdateAvatar) {
    // Установка isPending в true перед отправкой запроса
    setIsPending(true);

    // Вызов API для обновления аватара
    api.changeAvatar(onUpdateAvatar)
      .then((result) => {
        setCurrentUser(result);
        // Закрываем модальные окна
        closeAllPopups();
        // Установка isPending в false после успешного запроса
        setIsPending(false);
      })
      .catch((error) => {
        console.error('Error updating avatar:', error);
      });
  }

  // Обработчик формы - Добавить место
  function handleAddPlaceSubmit(onAddPlace) {
    // Установка isPending в true перед отправкой запроса
    setIsPending(true);

   //Вызов API для добавления новой карточки
    api.addNewCard(onAddPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        // Закрываем модальные окна
        closeAllPopups();
        // Установка isPending в false после успешного запроса
        setIsPending(false);
      })
      .catch((error) => {
        console.error('Error updating addPlace:', error);
      });
  }

  // Закрытие всех попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setDeleteCard(false);
  }

  // Обработчик нажатия на клавишу Escape для закрытия попапов
  function handleEscKeyPress(event) {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  }


  useEffect(() => {
    document.addEventListener('keydown', handleEscKeyPress);
    return () => {
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeletePopupClick}
        cards={cards}
        setCards={setCards}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isPending={isPending}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isPending={isPending}
      />
      <UpdateAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isPending={isPending}
      />
      <DeletePopupCard
        isOpen={deleteCard}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        isPending={isPending}
      />
      <ImagePopup
        isOpen={selectedCard}
        onClose={closeAllPopups}
        selectedCard={selectedCard}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
