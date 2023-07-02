import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  };

  function handleDellClick() {
    props.onCardTrashClick();
  };

  return (
    <article className="element">
      <button type="button" aria-label="trash" className="element__trash" onClick={handleDellClick} />
      <img className="element__img" src={props.link}
        alt={props.name} onClick={handleClick} />
      <div className="element__info">
        <h2 className="element__text">{props.name}</h2>
        <div className="element__row">
          <button type="button" aria-label="like" className="element__like" />
          <span className="element__like-count">{props.likes}</span>
        </div>
      </div>
    </article>
  );
};

export default Card;