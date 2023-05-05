import styles from './Footer.module.css'

export const Footer = () => {

  return (
    <footer className={styles.footer}>
      <p className={styles.title}>новый мир</p>
      <span className={styles.copyright}>© 2023 Новый Мир</span>
    </footer>
  )
};

export default Footer
