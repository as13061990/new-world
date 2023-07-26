import { observer } from 'mobx-react-lite'
import State from '../../../store/State';
import styles from './ModalPointer.module.css'
import { useMemo } from 'react';
import { modal } from '../../../types/enums';
import points from '../../../three/points';

export const ModalPointer = observer(() => {
  const modalType = State.getModal()

  const image = useMemo((): string => {
    let modalTypeCheck = State.getModal()
    
    if (modalTypeCheck === modal.NO) {
      
      modalTypeCheck = State.getModalPrev()
    }
    if (points) {
      if (points(modalTypeCheck)?.image) {
        return points(modalTypeCheck)?.image
      } else {
        return points(modalTypeCheck)?.image
      }
    } else {
      return null
    }
  }, [modalType])

  const name = useMemo((): string => {
    let modalTypeCheck = State.getModal()
    
    if (modalTypeCheck === modal.NO) {
      
      modalTypeCheck = State.getModalPrev()
    }
    if (points) {
      if (points(modalTypeCheck)?.name) {
        return points(modalTypeCheck)?.name
      } else {
        return points(modalTypeCheck)?.name
      }
    } else {
      return null
    }
  }, [modalType])

  const modalActive = State.getModalActive()
  
  const { x, y } = State.getIconPosition()
  const styleModal = useMemo((): {} => {
    if (modalActive && State.getCountryPointIndex() !== null) {
      return {
        backgroundColor: 'red',
        position: 'absolute',
        left: x - 55,
        top: y - 125,
        width: 110,
        height: 95,
        borderRadius: 10,
        opacity: 1,
        transition: '0.4s opacity',
      }
    } else {
      return {
        backgroundColor: 'red',
        position: 'absolute',
        left: x - 55,
        top: y - 125,
        width: 110,
        height: 95,
        borderRadius: 10,
        opacity: 0,
        transition: '0.1s opacity',
      }
    }
  }, [x,y, modalActive])

  return (
    <>
      <div id="test" style={styleModal}>
        <img src={image} alt='attraction' className={styles.img} />
        <p className={styles.text}>{name}</p>
        <div className={styles.triangle}></div>
      </div>
    </>
  )
});

export default ModalPointer
