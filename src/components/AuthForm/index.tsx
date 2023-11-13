import styles from "./auth-form.module.css";
import { useAuthForm } from "../../hooks/useAuthForm";
import { AuthFormProps } from "../../interfaces";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Modes } from "../../constants";
import { createUser } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../store/hooks/index";

const AuthForm = ({ mode, handleMode }: AuthFormProps) => {
  const { name, email, password, handleChange } = useAuthForm();
  const dispatch = useAppDispatch();

  const handleSubmit = (evt: SubmitEvent) => {
    evt.preventDefault();
    dispatch(createUser({ email, password }));
  };

  return (
    <div className={styles.form__wrapper}>
      <h3 className={styles.form__title}>Chat App</h3>
      <h6 className={styles.form__mode}>
        {mode === "login" ? "Вход" : "Регистрация"}
      </h6>
      <form className={styles.form__form} onSubmit={(evt) => handleSubmit(evt)}>
        {mode !== Modes.LOGIN && (
          <label htmlFor="display-name" className={styles.input__label}>
            Имя
            <input
              type="text"
              className={styles.form__input}
              name="display-name"
              id="display-name"
              value={name}
              onChange={(evt) => handleChange(evt)}
            />
          </label>
        )}
        <label htmlFor="email" className={styles.input__label}>
          Email
          <input
            type="text"
            className={styles.form__input}
            name="email"
            id="email"
            value={email}
            onChange={(evt) => handleChange(evt)}
          />
        </label>

        <label htmlFor="password" className={styles.input__label}>
          Password
          <input
            type="password"
            className={styles.form__input}
            name="password"
            id="password"
            autoComplete={password}
            value={password}
            onChange={(evt) => handleChange(evt)}
          />
        </label>
        {mode !== Modes.LOGIN && (
          <label htmlFor="avatar" className={styles.file__label}>
            <span>Загрузить аватар</span>
            <input
              type="file"
              className={styles.file__input}
              name="avatar"
              id="avatar"
            />
            <MdOutlineAddPhotoAlternate className={styles.file__icon} />
          </label>
        )}
        <button type="submit" className={styles.form__button}>
          {mode === Modes.LOGIN ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>
      {mode === Modes.LOGIN ? (
        <span className={styles.form__switch}>
          Нет аккаунта?{" "}
          <span
            className={styles.switch__link}
            onClick={() => handleMode("signup")}
          >
            Регистрация
          </span>
        </span>
      ) : (
        <span className={styles.form__switch}>
          Уже есть аккаунт.{" "}
          <span
            className={styles.switch__link}
            onClick={() => handleMode("login")}
          >
            Вход
          </span>
        </span>
      )}
    </div>
  );
};

export default AuthForm;
