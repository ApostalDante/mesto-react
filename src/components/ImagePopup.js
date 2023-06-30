import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_img" ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_img">
        <button type="button" aria-label="close" className="popup__close" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card ? props.card.link : ''}
          alt={props.card ? props.card.name : ''} />
        <h2 className="popup__title">{props.card ? props.card.name : ''}</h2>
      </div>
    </div>
  );
};

export default ImagePopup;