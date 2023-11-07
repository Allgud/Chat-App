import AuthForm from "../../components/AuthForm";
import { useMode } from "../../hooks/useMode";

const AuthScreen = () => {
  const { mode, handleMode } = useMode();

  return (
    <section className="screen__wrapper">
      <AuthForm mode={mode} handleMode={handleMode} />
    </section>
  );
};

export default AuthScreen;