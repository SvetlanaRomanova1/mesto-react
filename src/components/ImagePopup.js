import React from "react";

function ImagePopup(props){
    return(
        <div
            onClick={props.onClose}
            className={`popup popup_overlay ${props.isOpen ? 'popup_opened' : ''}`}
        >
            <div className="popup__wrapper">
                <button
                    type="button"
                    className="popup__cross-button"
                    onClick={props.onClose}
                />
                <img src={props.selectedCard?.link} alt="" className="popup__image"/>
                <p className="popup__text">{props.selectedCard?.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;