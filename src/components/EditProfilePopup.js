import { useState, useContext, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <fieldset className="form__fields">
        <label className="form__input">
          <input
            id="name-input"
            type="text"
            name="name"
            placeholder="Имя"
            className="form__field form__field_type_name"
            minLength="2"
            maxLength="40"
            required
            onChange={handleNameChange}
            value={name || ''}
          />
          <span className="form__field-error name-input-error" />
        </label>
        <label className="form__input">
          <input
            id="about-input"
            type="text"
            name="about"
            placeholder="О себе"
            className="form__field form__field_type_about"
            minLength="2"
            maxLength="200"
            required
            onChange={handleDescriptionChange}
            value={description || ''}
          />
          <span className="form__field-error about-input-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  );
};
