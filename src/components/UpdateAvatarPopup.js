import React from "react";
import PopupWithForm from "./PopupWithForm";

function UpdateAvatarPopup(props){
    return(
        <PopupWithForm
            name='update-avatar'
            title='Обновить аватар'
            submitButtonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <label className="popup__field-avatar">
                <input
                    type="url"
                    className="popup__input"
                    id="link-avatar"
                    name="link-avatar"
                    placeholder="Ссылка на картинку"
                    minLength="2"
                    required
                />
                <span className="popup__error-visible"/>
            </label>
        </PopupWithForm>
    );
}

export default UpdateAvatarPopup;