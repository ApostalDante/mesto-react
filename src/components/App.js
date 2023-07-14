import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getProfileDataInServer(), api.getCardsServer()]).then(([dataUser, cardObject]) => {
      setCurrentUser(dataUser)
      setCards(cardObject)
    }).catch(console.error)
  }, []);

  function addCardLike(card) {
    api.sendLikeCardToServer(card._id).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    }).catch(console.error);
  };

  function deleteCardLike(card) {
    api.deleteLikeCardToServer(card._id).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    }).catch(console.error);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      deleteCardLike(card);
    } else {
      addCardLike(card);
    }
  };

  function handleCardDelete(card) {
    api.deleteCardInServer(card._id).then(() => {
      setCards((state) => state.filter((c) => (c._id !== card._id && c)));
    }).catch(console.error);
  };

  function handleUpdateUser(dataUser) {
    api.sendProfileDataToServer(dataUser).then((newDataUser) => {
      setCurrentUser(newDataUser);
      closeAllPopups();
    }).catch(console.error);
  };

  function handleUpdateAvatar(dataAvata) {
    api.sendAvatarDataToServer(dataAvata).then((newDataAvatar) => {
      setCurrentUser(newDataAvatar);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  };

  function handleAddPlaceSubmit(cardObject) {
    api.addNewCardToServer(cardObject).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdatePlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;