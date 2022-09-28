import classNames from 'classnames';

export const ImagePopup = ({ card, onClose }) => (
  <div className={classNames('popup', 'popup_color_black', 'popup_type_image', { popup_opened: card })}>
    <figure className="popup__gallery">
      <img className="popup__image" src={card} alt={card} />
      <figcaption className="popup__capture" />
      <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose} />
    </figure>
  </div>
);
