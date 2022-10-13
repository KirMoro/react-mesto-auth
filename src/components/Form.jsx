import { Link } from 'react-router-dom';

export const Form = ({
  name, title, children, onSubmit, ariaLabel, buttonText, linkText,
}) => (
  <form name={`form-${name}`} className="form form_type_sign-up">
    <h3 className="form__title">{title}</h3>
    {children}
    <button
      type="submit"
      onClick={onSubmit}
      className="form__submit-button form__submit-button_theme_dark"
      aria-label={ariaLabel}
    >
      {buttonText}
    </button>
    <Link
      to="/"
      className="form__sublink"
    >
      {linkText || ''}
    </Link>
  </form>
);
