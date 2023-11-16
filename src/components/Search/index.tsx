import { SearchProps } from "../../interfaces";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./search.module.css";
import Contact from "../Contact/index";
import { useAppSelector } from "../../store/hooks/index";
import { useAppDispatch } from "../../store/hooks/index";
import { clearSearchList } from "../../store/slices/chatSlice";
import { Oval } from "react-loader-spinner";

const Search = ({ value, onChange, onSubmit, onClear }: SearchProps) => {
  const { searchUsers, onLoad, areUsersSearched } = useAppSelector(
    (state) => state.chat,
  );
  const dispatch = useAppDispatch();

  return (
    <div className={styles.search__wrapper}>
      <input
        type="text"
        className={styles.search__input}
        placeholder="Найти пользователя"
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
        onKeyDown={(evt) => onSubmit(evt.code)}
      />

      <Oval
        height={26}
        width={26}
        wrapperStyle={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
        }}
        color="#646cff"
        secondaryColor="#646cff"
        visible={onLoad}
      />
      {value && (
        <AiOutlineClose
          className={styles.search__clear}
          title="Очистить поле ввода"
          onClick={() => onClear()}
        />
      )}
      {areUsersSearched && (
        <>
          {searchUsers.length === 0 ? (
            <div className={styles.search__empty}>Пользователей не найдено</div>
          ) : (
            <ul
              className={styles.search__list}
              onClick={() => dispatch(clearSearchList())}
            >
              {searchUsers.map((user) => (
                <Contact username={user.displayName} avatar={user.photoURL} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
