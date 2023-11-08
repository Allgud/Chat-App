import { SearchProps } from "../../interfaces";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./search.module.css";

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className={styles.search__wrapper}>
      <input
        type="text"
        className={styles.search__input}
        placeholder="Найти чат"
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
      />
      {value && (
        <AiOutlineClose
          className={styles.search__clear}
          title="Очистить поле ввода"
        />
      )}
    </div>
  );
};

export default Search;