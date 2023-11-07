import HomeScreen from "../../screens/HomeScreen";
import styles from "./app.module.css";

const App = () => {
  return (
    <div className={styles.app__wrapper}>
      <HomeScreen />
    </div>
  );
};

export default App;