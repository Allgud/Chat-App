import styles from "./chat.module.css";
import { ChatProps } from "../../interfaces/index";
import NoPhoto from "../../assets/no_photo.png";
import {
  HiOutlineVideoCamera,
  HiDotsVertical,
  HiOutlineSearch,
} from "react-icons/hi";

const Chat = ({ avatar, username }: ChatProps) => {
  return (
    <div className={styles.chat__wrapper}>
      <div className={styles.chat__header}>
        <div className={styles.header__left}>
          <img
            src={avatar ? avatar : NoPhoto}
            alt="user pic"
            className={styles.left__image}
          />
          <span className={styles.left_text}>{username}</span>
        </div>
        <div className={styles.header__right}>
          <HiOutlineVideoCamera
            className={styles.right__icon}
            title="Видеозвонок"
          />
          <HiOutlineSearch className={styles.right__icon} />
          <HiDotsVertical className={styles.right__icon} title="Настройки" />
        </div>
      </div>
      <div className={styles.chat__content}></div>
      <div className={styles.chat__footer}>
        <input
          type="text"
          className={styles.footer__input}
          placeholder="Введите сообщение"
        />
      </div>
    </div>
  );
};

export default Chat;
