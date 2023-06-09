import { observer } from 'mobx-react-lite'
import styles from './Modal.module.css'
import State from '../../../store/State';
import { modal } from '../../../types/enums';
import { useMemo } from 'react';
import { runInAction } from "mobx"
import points from '../../../three/points';
import * as platform from 'platform';

export const Modal = observer(() => {
  let activeStyle = State.getModalActive() ? styles.active : styles.inactive
  const modalType = State.getModal()
  const index = State.getCountryPointIndex()
  if (modalType === modal.NO) {
    runInAction(() => {
      State.setModalActive(false)
    })
  }

  const onClickBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation()
    State.setModalActive(false)
    State.setCountryPointIndex(null)
  }

  const onClickModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation()
  }

  const title = useMemo((): string => {
    let modalTypeCheck = State.getModal()
    if (modalTypeCheck === modal.NO) {
      modalTypeCheck = State.getModalPrev()
    }
    switch (modalTypeCheck) {
      case (modal.CHINA):
        return 'китай'
      case (modal.INDIA):
        return 'Индия'
      case (modal.BELARUS):
        return 'Беларусь'
      case (modal.SERBIA):
        return 'Сербия'
      case (modal.SOUTH_AFRICA):
        return 'Южная африка'
      case (modal.BRAZIL):
        return 'Бразилия'
    }
  }, [modalType])

  const content = useMemo((): string => {
    let modalTypeCheck = State.getModal()
    let countryPointIndex = State.getCountryPointIndex()
    if (modalTypeCheck === modal.NO) {
      countryPointIndex = State.getCountryPointIndexPrev()
      modalTypeCheck = State.getModalPrev()
    }
    if (points) {
      if (points(modalTypeCheck)[countryPointIndex]?.data) {
        return points(modalTypeCheck)[countryPointIndex]?.data
      } else {
        return points(modalTypeCheck)[0]?.data
      }
    } else {
      return null
    }
  }, [modalType, index])


  
  const checkOS = platform.os.family.includes('OS') || platform.os.family.includes('Mac')
  const padding = checkOS ? styles.btn_back_ios : ''

  return (
    <div className={styles.modal_block + ' ' + activeStyle}>
      <button className={styles.btn_back + ' ' + padding} onClick={onClickBack}>
        Назад
      </button>
      <div className={styles.modal} onClick={onClickModal}>
        <p className={styles.title}>
          {title}
        </p>

        <p className={styles.text}>
          {content}
        </p>
      </div>
      {/* <div className={styles.btn_down}>
        <div className={styles.triangle_down}></div>
      </div> */}
    </div>
  )
});

export default Modal
