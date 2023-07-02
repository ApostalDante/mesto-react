import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleTrashClick() {
    setIsConfirmDeletePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsConfirmDeletePopupOpen(false);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  return (
    <div>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardTrashClick={handleTrashClick}
      />
      <Footer />
      <PopupWithForm
        name={'user'}
        title={'Редактировать профиль'}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonName={'Сохранить'}
      >
        <label htmlFor="user-input">
          <input className="form__input form__input_type_user-name" name="user-name" type="text" placeholder="Имя"
            id="user-input" required minLength="2" maxLength="40" />
          <span className="form__input-error user-input-error"></span>
        </label>
        <label htmlFor="myself-input">
          <input className="form__input form__input_type_user-myself" name="user-myself" type="text" placeholder="Занятие"
            id="myself-input" required minLength="2" maxLength="200" />
          <span className="form__input-error myself-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name={'card'}
        title={'Новое место'}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonName={'Создать'}
      >
        <label htmlFor="card-input">
          <input className="form__input form__input_type_card-name" name="card-name" type="text" placeholder="Название"
            id="card-input" required minLength="2" maxLength="30" />
          <span className="form__input-error card-input-error"></span>
        </label>
        <label htmlFor="url-input">
          <input className="form__input form__input_type_card-url" name="card-url" type="url" id="url-input" required
            placeholder="Ссылка на картинку" />
          <span className="form__input-error url-input-error"></span>
        </label>

      </PopupWithForm>
      <PopupWithForm
        name={'avatar'}
        title={'Обновить аватар'}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonName={'Создать'}
      >
        <label htmlFor="avatar-input">
          <input className="form__input form__input_type_avatar-url" name="avatar-url" type="url" id="avatar-input"
            required placeholder="Ссылка на аватар" />
          <span className="form__input-error avatar-input-error"></span>
        </label>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />
      <PopupWithForm
        name={'confirm-delete'}
        title={'Вы уверены?'}
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        buttonName={'Да'}
      />
    </div>
  );
};

export default App;