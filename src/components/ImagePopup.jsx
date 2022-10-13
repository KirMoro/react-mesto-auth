import classNames from 'classnames';

export const ImagePopup = (props) => (
  <div className={classNames('popup', 'popup_color_black', 'popup_type_image', { popup_opened: props.isOpen })}>
    <figure className="popup__gallery">
      <img className="popup__image" src={props.card.link} alt={props.card.name} />
      <figcaption className="popup__capture">{props.card.name}</figcaption>
      <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose} />
    </figure>
  </div>
);
