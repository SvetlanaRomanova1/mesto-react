import React from 'react';

function PopupWithForm(props) {
  const onClickOverlay = (e) => {
    if (e.target.classList.contains('popup_opened')) {
      props.onClose();
    }
  };
  return (
    <div
      onClick={onClickOverlay}
      className={`popup popup_type_${props.name} ${
        props.isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__container">
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={props.name}
        >
          <button
            type="button"
            className="popup__cross-button"
            onClick={props.onClose}
          />
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__button popup__submit-button" type="submit">
            {props.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
