import { ContactProps } from '../../interfaces'
import NoPhoto from '../../assets/no_photo.png'
import styles from './contact.module.css'

const Contact = ({ avatar, username, lastMessage }: ContactProps) => {
  return (
    <li className={styles.contact__wrapper}>
      <img src={avatar ? avatar : NoPhoto} alt="user pic" className="user__picture" />
      <div className={styles.contact__info}>
        <span className={styles.contact__name}>{username}</span>
        <span className={styles.contact__lastmessage}>{lastMessage}</span>
      </div>
    </li>
  )

}

export default Contact