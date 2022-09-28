import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Card = ({
  onCardClick, onCardLike, onCardDelete, card, onTrashClick,
}) => {
  const currentUserContext = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUserContext._id;
  const cardDeleteButtonClassName = (
    `elements__trash-button ${isOwn ? 'elements__trash-button_visible' : ''}`
  );

  const isLiked = card.likes.some((item) => item._id === currentUserContext._id);
  const cardLikeButtonClassName = (
    `elements__like-button ${isLiked ? 'elements_like-button_active' : ''}`
  );

  function handleClick() {
    onCardClick(card.link);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onTrashClick(true);

    onCardDelete(card);
  }

  return (
    <article className="elements__item">
      <img className="elements__image" src={card.link} alt={card.name} onClick={() => handleClick()} />
      <div className="elements__item-text">
        <h2 className="elements__title">{card.name}</h2>
        <button type="button" className={cardLikeButtonClassName} onClick={() => handleLikeClick()} aria-label="Понравилось" />
        <span className="elements__like-counter">{card.likes.length}</span>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={() => handleDeleteClick()} aria-label="Корзина" />
    </article>
  );
};
