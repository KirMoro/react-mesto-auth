import { useEffect, useState } from 'react';
// eslint-disable-next-line import/extensions
import { Route, Switch, useHistory } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import { Header } from './Header.jsx';
// eslint-disable-next-line import/extensions
import { Main } from './Main.jsx';
// eslint-disable-next-line import/extensions
import { Footer } from './Footer.jsx';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { ImagePopup } from './ImagePopup.jsx';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { ConfirmDeletePopup } from './ConfirmDeletePopup';
import { Register } from './Register';
import { Login } from './Login';
import { AppContext } from '../contexts/AppContext';
import { ProtectedRoute } from './ProtectedRoute';
import { InfoTooltip } from './InfoTooltip';
import { apiAuth } from '../utils/apiAuth';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLogin] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const history = useHistory();

  // Попапы
  const [isEditProfilePopupOpen, handleEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, handleAddPlaceClick] = useState(false);
  const [isEditAvatarPopupOpen, handleEditAvatarClick] = useState(false);
  const [isConfirmPopupOpen, handleConfirmClick] = useState(false);
  const [isImagePopupOpen, handleImageClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isInfoPopupOpen, handleInfoPopupClick] = useState(false);
  const [deleteCard, setDeleteCard] = useState(null);

  const closeAllPopups = () => {
    handleEditProfileClick(false);
    handleAddPlaceClick(false);
    handleEditAvatarClick(false);
    handleConfirmClick(false);
    handleInfoPopupClick(false);
    handleImageClick(false);
    setSelectedCard({});
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
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    api.setProfileInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userAvatar) {
    api.setProfileAvatar(userAvatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api.setNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteCardId(deleteCard) {
    setDeleteCard(deleteCard);
  }

  // Регистрация пользователя
  function handleRegistration(registrationData) {
    apiAuth.register(registrationData)
      .then(() => {
        setSignUp(!isSignUp);
        handleInfoPopupClick(!isInfoPopupOpen);
        history.push('/sign-in');
      }).catch((err) => {
        handleInfoPopupClick(!isInfoPopupOpen);
      });
  }

  // Авторизация пользователя
  function handleLogin(loginData) {
    apiAuth.login(loginData)
      .then((data) => {
        setLogin(!loggedIn);
        setSignUp(!isSignUp);
        handleInfoPopupClick(!isInfoPopupOpen);
        localStorage.setItem('token', data.token);
        history.push('/');
      })
      .catch((err) => {
        handleInfoPopupClick(!isInfoPopupOpen);
      });
  }

  // Проверка токена авторизации
  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      apiAuth.getTokenValid(token)
        .then((data) => {
          setLogin(!loggedIn);
          setUserEmail(data.data.email);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  // Загрузка с сервера данных о профиле и карточек
  useEffect(() => {
    if (loggedIn) {
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
    }
  }, [loggedIn]);

  // Выход из системы
  function signOut() {
    setLogin(!loggedIn);
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    handleImageClick(!isImagePopupOpen);
  }

  return (
    <AppContext.Provider value={{ loggedIn, setLogin }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            onClick={signOut}
            userEmail={userEmail}
          />
          <Switch>
            <Route path="/sign-up">
              <Register onRegister={handleRegistration} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <ProtectedRoute
              path="/"
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardId}
              onTrashClick={handleConfirmClick}
            />
          </Switch>
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
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isInfoPopupOpen}
            isSignUp={isSignUp}
            onClose={closeAllPopups}
          />

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
