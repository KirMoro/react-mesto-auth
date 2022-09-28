import '../pages/index.css';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/extensions
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { ImagePopup } from './ImagePopup.js';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { ConfirmDeletePopup } from './ConfirmDeletePopup';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, handleEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, handleAddPlaceClick] = useState(false);
  const [isEditAvatarPopupOpen, handleEditAvatarClick] = useState(false);
  const [isConfirmPopupOpen, handleConfirmClick] = useState(false);
  const [selectedCard, handleCardClick] = useState(null);

  useEffect(() => {
    const initialPromises = Promise.all([
      api.getProfileInfo(),
      api.getInitialCards(),
    ]);

    initialPromises
      .then(([profile, cardsInfo]) => {
        setCards(cardsInfo);
        setCurrentUser(profile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeAllPopups = () => {
    handleEditProfileClick(false);
    handleAddPlaceClick(false);
    handleEditAvatarClick(false);
    handleConfirmClick(false);
    handleCardClick(null);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUserContext._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((deleteCard) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => closeAllPopups());
  }

  function handleUpdateUser(userData) {
    api.setProfileInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => closeAllPopups());
  }

  function handleUpdateAvatar(userAvatar) {
    api.setProfileAvatar(userAvatar)
      .then((userData) => setCurrentUser(userData))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => closeAllPopups());
  }

  function handleAddPlaceSubmit(card) {
    api.setNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => closeAllPopups());
  }
  const [deleteCard, setDeleteCard] = useState();
  function handleDeleteCardId(deleteCard) {
    setDeleteCard(deleteCard);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardId}
          onTrashClick={handleConfirmClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onDeletePlace={handleCardDelete}
          deleteCard={deleteCard}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
