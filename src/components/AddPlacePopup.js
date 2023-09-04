import React, { useEffect, useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { useValidateField } from '../hooks/use-validate-field';
import { useIsEditFiled } from '../hooks/use-is-edit-field';

function AddPlacePopup(props) {
  const nameRef = useRef();
  const linkRef = useRef();
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const [isTypeName, setIsTypeName] = useIsEditFiled();
  const [isTypeLink, setIsTypeLink] = useIsEditFiled();

  const onChangeName = (e) => {
    setIsTypeName(true);
    setName(e.target.value);
  }

  const onChangeLink = (e) => {
    setIsTypeLink(true);
    setLink(e.target.value);
  }

  const validateMessageLink = useValidateField(linkRef);
  const validateMessageName = useValidateField(nameRef);


  // Обработчик отправки формы - Добавить место
  function handleSubmit(event){
    event.preventDefault()
    props.onAddPlace({
      name,
      link
    })
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      submitButtonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      disabled={props.isPending || validateMessageLink || validateMessageName}
      isPending={props.isPending}
    >
      <label className="popup__field">
        <input
          type="text"
          ref={nameRef}
          className="popup__input"
          id="popupAddPlaceInput"
          name="place"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={onChangeName}
        />
        <span className="popup__error-visible" >
          {isTypeName && validateMessageName}
        </span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          ref={linkRef}
          className="popup__input"
          id="popupLinkAddPlaceInput"
          name="link"
          placeholder="Ссылка на картинку"
          required
          onChange={onChangeLink}
        />
        <span className="popup__error-visible" >
          {isTypeLink && validateMessageLink}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
