import styles from './SecondSection.module.css'
import bg from '../../assets/images/section-two-bg.png'
import arrow from '../../assets/images/section-one-arrow.svg'

export const SecondSection = () => {

  return (
    <div  className={"section " + styles.section} id='section2'>
      <div className={styles.img_block}>
        <img src={bg} alt='bg' className={styles.img} />
        <div className={styles.button}>
            <img src={arrow} className={styles.arrow} alt='arrow' />
        </div>
      </div>
      
    </div>
  )
};

export default SecondSection
