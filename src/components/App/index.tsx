import AppRouter from "../../router/AppRouter";
import Loader from "../Loader";
import styles from "./app.module.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks/index";
import { handleIsUser } from "../../store/slices/userSlice";
import { useEffect } from "react";

const App = () => {
  const { loading } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(handleIsUser());
  }, []);

  return (
    <div className={styles.app__wrapper}>
      {loading && <Loader />}
      <AppRouter />
    </div>
  );
};

export default App;
