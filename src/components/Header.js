import {NavLink, useLocation} from "react-router-dom";

export const Header = () => {
  const location = useLocation()

    return (
        <header className="header">
            <div className="header__logo"/>
          {
            location.pathname === '/sign-up' ?
              <NavLink to='/sign-in' className='header__link'>Войти</NavLink> :
              <NavLink to='/sign-up' className='header__link'>Регистрация</NavLink>
          }
        </header>
    )
}
