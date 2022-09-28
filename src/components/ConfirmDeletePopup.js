import { PopupWithForm } from './PopupWithForm';

export const ConfirmDeletePopup = ({
  isOpen, onClose, onDeletePlace, deleteCard,
}) => {
  function handleSubmit(e) {
    e.preventDefault();

    onDeletePlace(deleteCard);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Да"
    >
      <fieldset className="form__fields" />
    </PopupWithForm>
  );
};
