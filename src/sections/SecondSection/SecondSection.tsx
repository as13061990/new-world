import styles from './SecondSection.module.css'
import bg from '../../assets/images/section-two-bg.png'
import State, { MAX_STEP } from '../../store/State';
import { observer } from 'mobx-react-lite';

export const SecondSection = observer(() => {
  const sectionActiveClass = State.getStep() === MAX_STEP - 1 ? styles.active
    : State.getStep() > MAX_STEP - 1 ? styles.inactiveUnder : styles.inactive

  const clickButton = (top: boolean) => {
    if (State.getStep() !== 9) return
    if (State.getModalActive()) return
    if (State.isAnimation()) return
    if (!top) State.plusStep()
    else State.minusStep()
  }

  return (
    <div className={styles.section + ' ' + sectionActiveClass} id='section2'>
      <div className={styles.img_block}>
        <img src={bg} alt='bg' className={styles.img} />
        <div className={styles.button_top} onClick={() => clickButton(true)}></div>
        <div className={styles.button_bottom} onClick={() => clickButton(false)}></div>
      </div>
    </div>
  )
});

export default SecondSection
