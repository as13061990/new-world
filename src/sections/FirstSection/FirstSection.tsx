import styles from './FirstSection.module.css'
import State from '../../store/State';
import Modal from './Modal/Modal';
import { modal } from '../../types/enums';
import { observer } from 'mobx-react-lite';

export const FirstSection = observer(({ innerRef }: any) => {
  const canvasThreeClass = State.getModal() === modal.NO ? styles.inactive : State.getModalActive() ? styles.inactive : styles.active
  const textClass = State.getStep() > 0 ? styles.inactiveText : styles.activeText

  const onClickCountry = (): void => {
    if (State.getModal() !== modal.NO) {
      State.setModalActive(true)
    }
  }
  const loadingActive = State.getIsLoaded();
  return (
    <div className={styles.bg + ' ' + canvasThreeClass} onClick={onClickCountry}>
      <div className={styles.blur_right}></div>
      <div className={styles.blur_left}></div>
      <div ref={innerRef} className={styles.section} id='section1'>
        {loadingActive
          &&
          <>
            <p className={styles.title + ' ' + textClass}>НОВЫЙ МИР</p>
            <p className={styles.subtitle + ' ' + textClass}>Мир изменился. Россия занимает в нём чёткую позицию, выстраивая отношения с державами на всех материках и континентах. Бизнес-корпорации, культурные союзы, исторические подвиги и простая человеческая дружба объединяют россиян с жителями Китая, Индии, Беларуси, Бразилии, Сербии и Южно-Африканской Республики. Мы посетили эти страны, чтобы рассказать вам много интересных и ярких историй, которые позволят по-другому взглянуть на Россию и её друзей.</p>
          </>
        }
      </div>

      <Modal />
      <div id='canvas_three' className={styles.canvas_three}></div>
    </div>
  )
});

export default FirstSection
