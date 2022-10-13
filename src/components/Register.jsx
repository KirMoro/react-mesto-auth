import { useState } from 'react';
import { Form } from './Form';

export const Register = ({ onRegister }) => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    onRegister(values);
  }

  return (
    <Form
      name="sign-up"
      title="Регистрация"
      onSubmit={handleSubmit}
      ariaLabel="Зарегистрироваться"
      buttonText="Зарегистрироваться"
      linkText="Уже зарегистрированы? Войти"
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <span className="form__field-error about-input-error" />
        </label>
      </fieldset>
    </Form>
  );
};
