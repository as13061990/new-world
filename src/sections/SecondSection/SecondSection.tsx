import styles from './SecondSection.module.css'
import bg from '../../assets/images/section-two-bg.png'
export const SecondSection = () => {

  return (
    <div  className={"section " + styles.section} id='section2'>
      <div className={styles.img_block}>
        <img src={bg} alt='bg' className={styles.img} />
      </div>
    </div>
  )
};

export default SecondSection
