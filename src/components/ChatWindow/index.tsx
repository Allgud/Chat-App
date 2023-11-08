import Sidebar from "../Sidebar";
import Chat from "../Chat/index";
import styles from "./chat-window.module.css";

const ChatWindow = () => {
  return (
    <div className={styles.window__wrapper}>
      <Sidebar />
      <Chat username="Tyler" />
    </div>
  );
};

export default ChatWindow;
