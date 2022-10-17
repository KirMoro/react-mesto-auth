import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export const Header = ({ onClick, userEmail }) => {
  const value = useContext(AppContext);
  const location = useLocation();

  function handleClick(e) {
    e.preventDefault();
    onClick();
  }

  return (
    <header className="header">
      <div className="header__logo" />
      {value.loggedIn
        && (
        <div className="header__main">
          <p className="header__text">{userEmail}</p>
          <NavLink
            to="/"
            onClick={handleClick}
            activeClassName="header__link_active"
            className="header__link"
          >
            Выйти
          </NavLink>
        </div>
        )}
      {!value.loggedIn
        && location.pathname === '/sign-in'
        && <NavLink to="/sign-up" className="header__link">Регистрация</NavLink>}

      {
        location.pathname === '/sign-up'
        && <NavLink to="/sign-in" className="header__link">Войти</NavLink>
      }
    </header>
  );
};
