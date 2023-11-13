import styles from "./message.module.css";
import cnBind from "classnames/bind";
import { MessageProps } from "../../interfaces";

const cx = cnBind.bind(styles);

const Message = ({ author }: MessageProps) => {
  return (
    <div
      className={cx(styles.message__wrapper, {
        reversed__wrapper: author === "me",
      })}
    >
      <div className={styles.message__info}>
        <img src="" alt="" className={styles.message__author} />
        <span className={styles.message__timestamp}>Just now</span>
      </div>
      <div
        className={cx(styles.message__body, {
          message__received: author !== "me",
          message__sended: author === "me",
        })}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat error
        cum expedita, accusantium, voluptates libero alias doloribus quibusdam
        voluptate excepturi porro iste architecto dolor id, dolorum aliquam hic
        quasi et vitae quam nihil. Reprehenderit laborum illum tempora, sit
        assumenda ut eaque obcaecati commodi nostrum magnam sunt voluptas
        asperiores officia voluptatem.
      </div>
    </div>
  );
};

export default Message;
