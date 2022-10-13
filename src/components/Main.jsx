import { useContext } from 'react';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Main = ({
  onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardDelete, onCardLike, onTrashClick,
}) => {
  const currentUserContext = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUserContext.avatar})` }}
        />
        <button
          type="button"
          className="profile__edit-avatar-button"
          aria-label="Редактировать"
          onClick={onEditAvatar}
        />
        <h1 className="profile__title">{currentUserContext.name}</h1>
        <p className="profile__subtitle">{currentUserContext.about}</p>
        <button
          type="button"
          className="profile__edit-button"
          aria-label="Редактировать"
          onClick={onEditProfile}
        />
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements" aria-label="Галерея">
        {cards.map((card) => (
          <Card
            key={(card._id)}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onTrashClick={onTrashClick}
          />
        ))}
      </section>
    </main>
  );
};
