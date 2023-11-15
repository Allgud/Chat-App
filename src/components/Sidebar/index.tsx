import Search from "../Search";
import { useSearch } from "../../hooks/useSearch";
import { MdLogout } from "react-icons/md";
import NoPhoto from "../../assets/no_photo.png";
import styles from "./sidebar.module.css";
import Contact from "../Contact";
import { useAppSelector } from "../../store/hooks";

const Sidebar = () => {
  const { searchValue, handleCahnge } = useSearch();
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className={styles.sidebar__wrapper}>
      <div className={styles.sidebar__header}>
        <div className={styles.header__info}>
          <img
            src={user ? user.photoUrl : NoPhoto}
            alt="user"
            className={styles.info__userpic}
          />
          <span className={styles.info__username}>{user?.displayName}</span>
        </div>
        <div className={styles.header__logout}>
          <MdLogout />
          <span className={styles.logout__text}>Выход</span>
        </div>
      </div>
      <Search value={searchValue} onChange={handleCahnge} />
      <ul className={styles.sidebar__contacts}>
        <Contact username="Tyler" lastMessage="See you later" />
      </ul>
    </div>
  );
};

export default Sidebar;
