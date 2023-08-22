import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopupCard() {
  return (
    <PopupWithForm name="delete-card" title="Вы уверены?" submitButtonText="Да">
      <div className="popup__content" id="confirmPopup">
        <div className="popup__form-confirm" name="delete-card"></div>
      </div>
    </PopupWithForm>
  );
}

export default DeletePopupCard;
