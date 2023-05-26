import styles from './FirstSection.module.css'
import State from '../../store/State';
import Modal from './Modal/Modal';
import { modal } from '../../types/enums';
import { observer } from 'mobx-react-lite';

export const FirstSection = observer(({ innerRef }: any) => {
  const platfotmClass = State.getIsMobile() ? styles.section_mobile : styles.section_dekstop

  const canvasThreeClass = State.getModal() === modal.NO ? styles.inactive : State.getModalActive() ? styles.inactive : styles.active

  const onClickCountry = (): void => {
    if (State.getModal() !== modal.NO) {
      State.setModalActive(true)
    }
  }


  return (
    <div className={styles.bg + ' ' + canvasThreeClass} onClick={onClickCountry}>
      <div className={styles.blur_right}></div>
      <div className={styles.blur_left}></div>
      <div ref={innerRef} className={"section " + styles.section + ' ' + platfotmClass} id='section1'>
        <p className={styles.title}>НОВЫЙ МИР</p>
        <p className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis eros commodo, vehicula turpis eu, posuere diam. Duis et dapibus lacus. Morbi bibendum, nulla sed imperdiet lacinia, diam nibh mattis sapien, non vehicula nulla nisl et nibh. Sed ac tincidunt augue. Suspendisse dictum pulvinar purus sed eleifend. Sed eu suscipit nulla. Sed nec risus eget justo dapibus cursus in et nibh. </p>
      </div>
      <Modal />
      <div id='canvas_three' className={styles.canvas_three}></div>
    </div>
  )
});

export default FirstSection
