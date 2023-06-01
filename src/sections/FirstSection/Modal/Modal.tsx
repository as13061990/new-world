import { observer } from 'mobx-react-lite'
import styles from './Modal.module.css'
import State from '../../../store/State';
import { modal } from '../../../types/enums';
import { useMemo } from 'react';
import { runInAction } from "mobx"
import points from '../../../three/points';

export const Modal = observer(() => {
  let activeStyle = State.getModalActive() ? styles.active : styles.inactive
  const modalType = State.getModal()
  if (modalType === modal.NO) {
    runInAction(() => {
      State.setModalActive(false)
    })
  }

  const onClickBack = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation()
    State.setModalActive(false)
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
        return 'Белоруссия'
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
    }
    if (points) {
      return points(modalTypeCheck)[countryPointIndex]?.data
    } else {
      return null
    }
  }, [modalType])

  console.log(points(modal.CHINA))
  return (
    <div className={styles.modal_block + ' ' + activeStyle}>
      <div className={styles.btn_back} onClick={onClickBack}>
        Назад
      </div>
      <div className={styles.modal} onClick={onClickModal}>
        <p className={styles.title}>
          {title}
        </p>

        <p className={styles.text}>
          {content}
        </p>
      </div>
      <div className={styles.btn_down}>
        <div className={styles.triangle_down}></div>
      </div>
    </div>
  )
});

export default Modal
