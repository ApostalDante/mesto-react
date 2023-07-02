import React, { useEffect } from "react";
import api from "../utils/api";
import Card from "./Card";


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardTrashClick }) {
  const [userData, setUserData] = React.useState({});
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    Promise.all([api.getProfileDataInServer(), api.getCardsServer()]).then(([dataUser, cardObject]) => {
      setUserData(dataUser)
      setCards(cardObject)
    }).catch(console.error)
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-img" src={userData.avatar} alt="аватар" />
          <button type="button" aria-label="change" className="profile__change-avatar-btm" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__user-name">{userData.name}</h1>
          <button type="button" aria-label="open" className="profile__edit-btm" onClick={onEditProfile}>
          </button>
          <p className="profile__user-myself">{userData.about}</p>
        </div>
        <button type="button" aria-label="open" className="profile__add-btm" onClick={onAddPlace}>
        </button>
      </section>
      <section className="cards">
        <section className="elements">
          {cards.map((card) => (
            < Card
              key={card._id}
              card={card}
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              onCardClick={onCardClick}
              onCardTrashClick={onCardTrashClick}
            />
          ))}
        </section>
      </section>
    </main>
  );
};

export default Main;