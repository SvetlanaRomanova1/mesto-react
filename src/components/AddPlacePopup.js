import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props){
    return(
        <PopupWithForm
            name='add-place'
            title='Новое место'
            submitButtonText="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <label className="popup__field">
                <input
                    type="text"
                    className="popup__input"
                    id="popupAddPlaceInput"
                    name="place"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    required
                />
                <span className="popup__error-visible"/>
            </label>
            <label className="popup__field">
                <input type="url"
                       className="popup__input"
                       id="popupLinkAddPlaceInput"
                       name="link"
                       placeholder="Ссылка на картинку"
                       required
                />
                <span className="popup__error-visible"/>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;