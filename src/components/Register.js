import { useState, useContext, useEffect } from 'react';
import {Link} from "react-router-dom";
import {Form} from "./Form";

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSignUp({
      email,
      password,
    });
  }

  return (
    <Form
      name='sign-up'
      title='Регистрация'
      onSubmit={handleSubmit}
      buttonText='Зарегистрироваться'
      linkText='Уже зарегистрированы? Войти'
    >
      <fieldset className="form__fields">
        <label className="form__input">
          <input
            id="email-input"
            type="email"
            name="email"
            placeholder="Email"
            className="form__field form__field_theme_dark form__field_type_name"
            minLength="2"
            maxLength="40"
            required
            onChange={handleEmailChange}
            value={email || ''}
          />
          <span className="form__field-error name-input-error" />
        </label>
        <label className="form__input">
          <input
            id="password-input"
            type="password"
            name="password"
            placeholder="Пароль"
            className="form__field form__field_theme_dark form__field_type_about"
            minLength="2"
            maxLength="200"
            required
            onChange={handlePasswordChange}
            value={password || ''}
          />
          <span className="form__field-error about-input-error" />
        </label>
      </fieldset>
    </Form>
  );
};
//
//
//
//
//
// import { useState, useContext, useEffect } from 'react';
// import {Link} from "react-router-dom";
//
// export const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//
//   function handleEmailChange(e) {
//     setEmail(e.target.value);
//   }
//
//   function handlePasswordChange(e) {
//     setPassword(e.target.value);
//   }
//
//   function handleSubmit(e) {
//     e.preventDefault();
//
//     onSignUp({
//       email,
//       password,
//     });
//   }
//
//   return (
//       <form name={`form`} className="form form_type_sign-up" noValidate>
//         <h3 className="form__title">Регистрация</h3>
//         <fieldset className="form__fields">
//           <label className="form__input">
//             <input
//               id="email-input"
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="form__field form__field_theme_dark form__field_type_name"
//               minLength="2"
//               maxLength="40"
//               required
//               onChange={handleEmailChange}
//               value={email || ''}
//             />
//             <span className="form__field-error name-input-error" />
//           </label>
//           <label className="form__input">
//             <input
//               id="password-input"
//               type="password"
//               name="password"
//               placeholder="Пароль"
//               className="form__field form__field_theme_dark form__field_type_about"
//               minLength="2"
//               maxLength="200"
//               required
//               onChange={handlePasswordChange}
//               value={password || ''}
//             />
//             <span className="form__field-error about-input-error" />
//           </label>
//         </fieldset>
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           className="form__submit-button form__submit-button_theme_dark"
//           aria-label='Зарегистрироваться'
//         >
//           Зарегистрироваться
//         </button>
//         <Link
//           to='/'
//           className='form__sublink'
//         >
//           Уже зарегистрированы? Войти
//         </Link>
//       </form>
//   );
// };
