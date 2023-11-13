import styles from "./chat.module.css";
import ChatBottom from "../ChatBottom";
import { ChatProps } from "../../interfaces/index";
import Messages from "../Messages";
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
      <Messages />
      <ChatBottom />
    </div>
  );
};

export default Chat;
