import AuthScreen from "../../screens/AuthScreen/index";
import styles from "./app.module.css";

const App = () => {
  return (
    <div className={styles.app__wrapper}>
      <AuthScreen />
    </div>
  );
};

export default App;
