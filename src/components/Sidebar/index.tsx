import Search from "../Search";
import { useSearch } from "../../hooks/useSearch";
import styles from "./sidebar.module.css";
// import Contact from "../Contact";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import SidebarNav from "../SidebarNav";
import { useEffect } from "react";
import { fetchChats } from "../../store/slices/chatSlice";

const Sidebar = () => {
  const { searchValue, handleChange, handleSubmit, clearSearch } = useSearch();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      dispatch(fetchChats(user.id))
    }
  }, [user])

  return (
    <div className={styles.sidebar__wrapper}>
      <SidebarNav
        displayName={user ? user.displayName : "Пользователь"}
        imgUrl={user ? user.photoURL : ""}
      />
      <Search
        value={searchValue}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClear={clearSearch}
      />
      <ul className={styles.sidebar__contacts}></ul>
    </div>
  );
};

export default Sidebar;
