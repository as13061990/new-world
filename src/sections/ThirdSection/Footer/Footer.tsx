import { observer } from 'mobx-react-lite'
import styles from './Footer.module.css'
import State, { MAX_STEP } from '../../../store/State';

export const Footer = observer(() => {
  let sectionActiveClass = State.getStep() >= MAX_STEP + 1 ? styles.active : styles.inactive
  return (
    <footer className={styles.footer + ' ' + sectionActiveClass}>
      <p className={styles.title}>новый мир</p>
      <span className={styles.copyright}>© 2023 Новый Мир</span>
    </footer>
  )
});

export default Footer
