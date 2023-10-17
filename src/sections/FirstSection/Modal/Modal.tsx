import { observer } from 'mobx-react-lite'
import styles from './Modal.module.css'
import State from '../../../store/State';
import { modal } from '../../../types/enums';
import { useMemo } from 'react';
import { runInAction } from "mobx"
import points from '../../../three/points';
import * as platform from 'platform';
import { useNavigate } from 'react-router-dom';

export const Modal = observer(() => {
  const navigate = useNavigate()
  const activeStyle = State.getModalActive() ? styles.active : styles.inactive
  const modalType = State.getModal()

  if (modalType === modal.NO) {
    runInAction(() => {
      State.setModalActive(false)
    })
  }

  const onClickBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
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
        return 'Республика Беларусь'
      case (modal.SERBIA):
        return 'Сербия'
      case (modal.SOUTH_AFRICA):
        return 'ЮАР'
      case (modal.BRAZIL):
        return 'Бразилия'
    }
  }, [modalType])

  const content = useMemo((): string => {
    let modalTypeCheck = State.getModal()

    if (modalTypeCheck === modal.NO) {
      modalTypeCheck = State.getModalPrev()
    }
    if (points) {
      if (points(modalTypeCheck)?.data) {
        return points(modalTypeCheck)?.data
      } else {
        return points(modalTypeCheck)?.data
      }
    } else {
      return null
    }
  }, [modalType])


  const link = useMemo((): string => {
    let modalTypeCheck = State.getModal()
    if (modalTypeCheck === modal.NO) {
      modalTypeCheck = State.getModalPrev()
    }
    switch (modalTypeCheck) {
      case (modal.CHINA):
        return 'https://vk.com/wall-24199209_20083502'
      case (modal.INDIA):
        return 'https://vk.com/video-24199209_456303310?t=16s'
      case (modal.BELARUS):
        return 'https://vk.com/video-24199209_456303769'
      case (modal.SERBIA):
        return 'https://vk.com/wall-24199209_20083502'
      case (modal.SOUTH_AFRICA):
        return 'https://vk.com/video-24199209_456302464?t=12s'
      case (modal.BRAZIL):
        return 'https://vk.com/video-24199209_456302864?t=47s'
    }
  }, [modalType])

  const page = useMemo((): string => {
    let modalTypeCheck = State.getModal()
    if (modalTypeCheck === modal.NO) {
      modalTypeCheck = State.getModalPrev()
    }
    switch (modalTypeCheck) {
      case (modal.CHINA):
        return '/africa'
      case (modal.INDIA):
        return '/india'
      case (modal.BELARUS):
        return '/belarus'
      case (modal.SERBIA):
        return '/serbia'
      case (modal.SOUTH_AFRICA):
        return '/africa'
      case (modal.BRAZIL):
        return 'brazil'
    }
  }, [modalType])


  const checkOS = platform.os.family.includes('OS') || platform.os.family.includes('Mac') || platform.name.includes('Safari') || platform.name.includes('OS')
  const padding = checkOS ? styles.btn_back_ios : ''

  return (
    <div className={styles.modal_block + ' ' + activeStyle}>
      <button className={styles.btn_back + ' ' + padding} onClick={onClickBack}>Назад</button>
      <div className={styles.modal} onClick={onClickModal}>
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{content}</p>
        <div className={styles.button_block}>
          <div className={styles.button} onClick={() => navigate(page)}>
            <span className={padding}>
              {'Узнать больше о стране'.toUpperCase()}
            </span>
          </div>
          <div className={styles.button} onClick={() => window.open(link, '_blank').focus()}>
            <span className={padding}>
              {'Смотреть фильм'.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
});

export default Modal
