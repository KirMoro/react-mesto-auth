import classNames from 'classnames';

export const InfoTooltip = ({ isOpen, onClose, isSignUp }) => (
  <div className={classNames('popup', { popup_opened: isOpen })}>
    <div className="popup__container">
      {
        isSignUp
          ? (
            <>
              <div className="popup__confirm-image popup__confirm-image_type_success" />
              <h3 className="popup__title popup__title_type_confirm">Вы успешно зарегистрировались!</h3>
            </>
          )
          : (
            <>
              <div className="popup__confirm-image popup__confirm-image_type_fail" />
              <h3 className="popup__title popup__title_type_confirm">
                Что-то пошло не так!
                Попробуйте ещё раз.
              </h3>
            </>
          )
      }
      <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={() => onClose(isOpen)} />
    </div>
  </div>
);
