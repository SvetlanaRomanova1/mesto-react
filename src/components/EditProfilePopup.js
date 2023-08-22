import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      submitButtonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <label className="popup__field">
        <input
          type="text"
          className="popup__input"
          id="name"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error-visible" />
      </label>
      <label className="popup__field">
        <input
          type="text"
          className="popup__input"
          id="job"
          name="job"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error-visible" />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
