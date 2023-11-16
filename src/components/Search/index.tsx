import { SearchProps } from "../../interfaces";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./search.module.css";
import Contact from "../Contact/index";
import { useAppSelector, useAppDispatch } from "../../store/hooks/index";
import { Oval } from "react-loader-spinner";
import { getCurrentChat } from '../../store/slices/chatSlice'

const Search = ({ value, onChange, onSubmit, onClear }: SearchProps) => {
  const { searchUsers, onLoad, areUsersSearched } = useAppSelector(
    (state) => state.chat,
  );
  const dispatch = useAppDispatch()
  const hadleSelected = (data: { [key: string]: string }) => {
    onClear()
    dispatch(getCurrentChat(data))
  }

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
      {
        areUsersSearched &&
        <ul className={styles.search__list}>
          {!searchUsers ? <div className={styles.search__empty}>Пользователей не найдено</div> : searchUsers.map((user) => (
            <Contact
              username={user.displayName}
              avatar={user.photoURL}
              lastMessage=""
              userId={user.id}
              key={user.id}
              onClick={hadleSelected}
            />
          ))}
        </ul>
      }
    </div >
  );
};

export default Search;
