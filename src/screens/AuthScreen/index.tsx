import AuthForm from "../../components/AuthForm";
import { useMode } from "../../hooks/useMode";
import styles from "./auth-screen.module.css";

const AuthScreen = () => {
  const { mode, handleMode } = useMode();

  return (
    <section className={styles.screen__wrapper}>
      <AuthForm mode={mode} handleMode={handleMode} />
    </section>
  );
};

export default AuthScreen;