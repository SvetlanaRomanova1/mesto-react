import React from 'react';

function DeletePopupCard(props) {
  const popupClass = props.isOpen ? 'popup popup_opened' : 'popup'
  return (
    <div
      className={popupClass}
      id="popupDeleteCard"
      onClick={props.onClose}
    >
      <div className="popup__content" id="confirmPopup">
        <button
          className="popup__cross-button popup__close-button"
          type="button"
          onClick={props.onClose}
        />
        <form className="popup__form-confirm">
          <p className="popup__title">Вы уверены?</p>
          <button
            className="popup__confirm-button"
            type="submit"
            onClick={props.onSubmit}
          >
            {props.isPending ? 'Сохранение...' : 'Да'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeletePopupCard;
