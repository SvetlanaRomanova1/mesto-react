import { useEffect, useState } from 'react';
import React from 'react';
import imageAvatar from '../image/avatar.jpg';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  // Стейты для хранения информации о пользователе и карточках
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState(imageAvatar);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Загрузка данных пользователя и карточек при монтировании компонента
    api
      .getUserInfo()
      .then((UserInfo) => {
        setUserName(UserInfo.name);
        setUserDescription(UserInfo.about);
        setUserAvatar(UserInfo.avatar);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
    api
      .getCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div onClick={props.onEditAvatar} className="profile__avatar-wrap">
            <img
              className="profile__avatar"
              src={userAvatar}
              alt="Фото: Жак-ИвКусто"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__button"
              type="button"
              aria-label="Редактировать профиль"
            />
            <p className="profile__title">{userDescription}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="Добавить место"
        />
      </section>
      <section className="cards" aria-label="Фотогалерея">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
