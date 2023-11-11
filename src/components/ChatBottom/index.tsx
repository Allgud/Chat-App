import styles from './shat-bottom.module.css'
import { FiPaperclip } from 'react-icons/fi'
import cn from 'classnames'

const ChatBottom = () => {
  return (
    <form className={styles.chat__footer}>
      <input
        type="text"
        className={styles.footer__input}
        placeholder="Введите сообщение"
      />
      <label htmlFor="clip" className={styles.file__label}>
        <input type="file" id="clip" className={styles.footer__file} />
        <FiPaperclip className={cn(styles.footer__icon, styles.clip__icon)} />
      </label>
      <button className={styles.footer__button}>Отправить</button>
    </form>
  )
}

export default ChatBottom