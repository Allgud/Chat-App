import AppRouter from "../../router/AppRouter";
import styles from "./app.module.css";

const App = () => {
  return (
    <div className={styles.app__wrapper}>
      <AppRouter />
    </div>
  );
};

export default App;
