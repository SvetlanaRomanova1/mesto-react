import React from 'react';

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="card" key={card._id} onClick={handleClick}>
      <div
        className="card__image"
        style={{ backgroundImage: `url(${card.link})` }}
      />
      <button
        className="card__delete-button"
        type="button"
        aria-label="Корзина"
      />
      <div className="card__container">
        <h4 className="card__title">{card.name}</h4>
        <button className="card__like-button" type="button" aria-label="Лайк">
          <span className="card__like-number">{card.likes.length}</span>
        </button>
      </div>
    </article>
  );
}

export default Card;
