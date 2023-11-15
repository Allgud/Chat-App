import { RotatingLines } from "react-loader-spinner";
import { LoaderProps } from "../../interfaces/index";
import styles from "./loader.module.css";

const Loader = ({ isVisible }: LoaderProps) => {
  return (
    <div className={styles.loader__wrapper}>
      <RotatingLines
        visible={isVisible}
        strokeColor="#646cff"
        animationDuration={1}
      />
    </div>
  );
};

export default Loader;
