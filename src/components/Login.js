import { useState, useContext, useEffect } from 'react';
import {Form} from "./Form";
import {apiAuth} from "../utils/apiAuth";

export const Login = () => {
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

    apiAuth.login({
      password,
      email
    }).then((data) => {
      localStorage.setItem('token', data.token);
      });
  }

  return (
    <Form
      name='sign-in'
      title='Вход'
      onSubmit={handleSubmit}
      buttonText='Войти'
      linkText=''
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
