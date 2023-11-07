import Sidebar from '../Sidebar'
import styles from './chat-window.module.css'

const ChatWindow = () => {
  return <div className={styles.window__wrapper}>
    <Sidebar />
  </div>
}

export default ChatWindow