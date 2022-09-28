import { PopupWithForm } from "./PopupWithForm";
import {useEffect, useRef} from "react";

export const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <fieldset className="form__fields">
        <label className="form__input">
          <input
            id="url-avatar-input"
            type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            className="form__field form__field_type_link"
            required
            ref={avatarRef}
          />
          <span className="form__field-error url-avatar-input-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  )
}


