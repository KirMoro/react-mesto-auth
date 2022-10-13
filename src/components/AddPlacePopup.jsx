import { useEffect, useState } from 'react';
import { PopupWithForm } from './PopupWithForm';

export const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <fieldset className="form__fields">
        <label className="form__input">
          <input
            id="title-input"
            type="text"
            name="name"
            placeholder="Название"
            className="form__field form__field_type_title"
            minLength="2"
            maxLength="30"
            required
            value={name}
            onChange={handleNameChange}
          />
          <span className="form__field-error title-input-error" />
        </label>
        <label className="form__input">
          <input
            id="url-input"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            className="form__field form__field_type_link"
            required
            value={link}
            onChange={handleLinkChange}
          />
          <span className="form__field-error url-input-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  );
};
