import React, { useEffect, useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../constexts/CurrentUserContext';
import { useValidateField } from '../hooks/use-validate-field';


function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const nameRef = useRef();
  const descriptionRef = useRef();
  const validateMessageName = useValidateField(nameRef);
  const validateMessageDescription = useValidateField(descriptionRef);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  // Обработчик отправки формы - Редактировать профиль
  function handleSubmit(event) {
    event.preventDefault();
    props
      .onUpdateUser({
        name,
        about: description,
      });
  }

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
    }
  }, [currentUser]);

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      submitButtonText='Сохранить'
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      disabled={props.isPending || validateMessageDescription || validateMessageName}
      isPending={props.isPending}
    >
      <label className='popup__field'>
        <input
          type='text'
          className='popup__input'
          id='name'
          name='name'
          placeholder='Имя'
          minLength='2'
          maxLength='40'
          value={name}
          onChange={handleNameChange}
          required
          ref={nameRef}
        />
        <span className='popup__error-visible'>
          {validateMessageName}
        </span>
      </label>
      <label className='popup__field'>
        <input
          type='text'
          className='popup__input'
          id='job'
          name='job'
          placeholder='О себе'
          minLength='2'
          maxLength='200'
          value={description}
          onChange={handleDescriptionChange}
          required
          ref={descriptionRef}
        />
        <span className='popup__error-visible' >
          {validateMessageDescription}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
