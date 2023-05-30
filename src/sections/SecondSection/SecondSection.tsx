import styles from './SecondSection.module.css'
import bg from '../../assets/images/section-two-bg.png'
import arrow from '../../assets/images/section-one-arrow.svg'
import State, { MAX_STEP } from '../../store/State';
import { observer } from 'mobx-react-lite';

export const SecondSection = observer(() => {
  let sectionActiveClass = State.getStep() === MAX_STEP - 1 ? styles.active
    : State.getStep() > MAX_STEP - 1 ? styles.inactiveUnder : styles.inactive

  return (
    <div className={styles.section + ' ' + sectionActiveClass} id='section2'>
      <div className={styles.img_block}>
        <img src={bg} alt='bg' className={styles.img} />
        <div className={styles.button}>
          <img src={arrow} className={styles.arrow} alt='arrow' />
        </div>
      </div>

    </div>
  )
});

export default SecondSection
