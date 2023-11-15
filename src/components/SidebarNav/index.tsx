import { MdLogout } from "react-icons/md";
import NoPhoto from "../../assets/no_photo.png";
import styles from './sidebar-nav.module.css'
import { SidebarNavProps } from "../../interfaces";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

const SidebarNav = ({ displayName, imgUrl }: SidebarNavProps) => {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.sidebar__header}>
      <div className={styles.header__info}>
        <img
          src={imgUrl ? imgUrl : NoPhoto}
          alt="user"
          className={styles.info__userpic}
        />
        <span className={styles.info__username}>{displayName}</span>
      </div>
      <div className={styles.header__logout} onClick={() => dispatch(logout())}>
        <MdLogout />
        <span className={styles.logout__text}>Выход</span>
      </div>
    </div>
  )
}

export default SidebarNav