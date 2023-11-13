import Message from "../Message";
import styles from "./messages.module.css";

const Messages = () => {
  return (
    <div className={styles.chat__content}>
      <Message author="Tyler" />
      <Message author="me" />
    </div>
  );
};

export default Messages;
