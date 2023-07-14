import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {
  const currentAvatar = React.useRef();

  React.useEffect(() => {
    currentAvatar.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: currentAvatar.current.value
    });
  };

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonName={'Создать'}
      onSubmit={handleSubmit}
    >
      <label htmlFor="avatar-input">
        <input ref={currentAvatar} className="form__input form__input_type_avatar-url" name="avatar-url" type="url" id="avatar-input"
          required placeholder="Ссылка на аватар" />
        <span className="form__input-error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;