import classNames from 'classnames';

export const PopupWithForm = ({
  name, title, isOpen, onClose, children, buttonText, onSubmit
}) => (
  <div className={classNames('popup', `'popup_type_${name}`, { popup_opened: isOpen })}>
    <div className="popup__container">
      <h3 className="popup__title">{title}</h3>
      <form name={`form-${name}`} className="form form_type_edit" noValidate>
        {children}
        <button type="submit" onClick={onSubmit} className="form__submit-button" aria-label={buttonText}>
          {buttonText}
        </button>
      </form>
      <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={() => onClose(isOpen)} />
    </div>
  </div>
);
