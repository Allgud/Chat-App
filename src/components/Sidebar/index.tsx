import Search from "../Search";
import { useSearch } from "../../hooks/useSearch";

import styles from "./sidebar.module.css";
import Contact from "../Contact";
import { useAppSelector } from "../../store/hooks";
import SidebarNav from "../SidebarNav";

const Sidebar = () => {
  const { searchValue, handleChange, handleSubmit } = useSearch();
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className={styles.sidebar__wrapper}>
      <SidebarNav
        displayName={user ? user.displayName : "Пользователь"}
        imgUrl={user ? user.photoUrl : ''}
      />
      <Search value={searchValue} onChange={handleChange} onSubmit={handleSubmit} />
      <ul className={styles.sidebar__contacts}>
        <Contact username="Tyler" lastMessage="See you later" />
      </ul>
    </div>
  );
};

export default Sidebar;
