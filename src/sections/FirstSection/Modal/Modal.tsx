import { observer } from 'mobx-react-lite'
import styles from './Modal.module.css'
import State from '../../../store/State';
import { modal } from '../../../types/enums';
import { useMemo } from 'react';
import { runInAction } from "mobx"
export const Modal = observer(() => {
  let activeStyle = State.getModalActive() ? styles.active : styles.inactive
  const modalType = State.getModal()
  if (modalType === modal.NO) {
    runInAction(()=>{
      State.setModalActive(false)
    })
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation()
    State.setModalActive(false)
  }

  const title = useMemo((): string => {
    switch (modalType) {
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
      case (modal.NO):
        return 'Страна'
    }
  }, [modalType])


  return (
    <div className={styles.modal_block + ' ' + activeStyle}>
      <div className={styles.btn_back} onClick={onClick}>
        Назад
      </div>
      <div className={styles.modal}>
        <p className={styles.title}>
          {title}
        </p>

        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis eros commodo, vehicula turpis eu, posuere diam. Duis et dapibus lacus. Morbi bibendum, nulla sed imperdiet lacinia, diam nibh mattis sapien, non vehicula nulla nisl et nibh. Sed ac tincidunt augue. Suspendisse dictum pulvinar purus sed eleifend. Sed eu suscipit nulla. Sed nec risus eget justo dapibus cursus in et nibh.  Mauris nec diam at leo pellentesque dignissim et eu augue. Nunc in mattis nibh, et laoreet arcu. Aenean sit amet rhoncus risus. Etiam vitae pellentesque diam, nec porttitor eros. Aliquam vehicula diam a nisi sodales, sit amet feugiat dui vulputate. Vestibulum pulvinar ligula rutrum eros laoreet pellentesque. Aliquam
        </p>
      </div>
      <div className={styles.btn_down}>
        <div className={styles.triangle_down}></div>
      </div>
    </div>
  )
});

export default Modal
