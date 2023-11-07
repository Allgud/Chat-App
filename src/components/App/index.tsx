import AuthScreen from "../../screens/AuthScreen";
import styles from "./app.module.css";

const App = () => {
  return (
    <div className={styles.app__wrapper}>
      <AuthScreen />
    </div>
  );
};

export default App;