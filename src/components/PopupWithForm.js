import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button type="button" aria-label="close" className="popup__close" onClick={props.onClose}></button>
        <form method="get" className={`form form_type_${props.name}`} name={props.name}>
          <fieldset className="form__set">
            <h2 className="form__header">{props.title}</h2>
            {props.children}
            <button type="submit" aria-label="save" className="form__save">{props.buttonName}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
