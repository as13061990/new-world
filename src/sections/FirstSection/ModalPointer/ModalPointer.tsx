import { observer } from 'mobx-react-lite'
import State from '../../../store/State';
import styles from './ModalPointer.module.css'
import { useMemo } from 'react';
import { modal } from '../../../types/enums';
import points from '../../../three/points';

export const ModalPointer = observer(() => {
  const modalType = State.getModal()
  const index = State.getCountryPointIndex()

  const image = useMemo((): string => {
    let modalTypeCheck = State.getModal()
    let countryPointIndex = State.getCountryPointIndex()
    if (modalTypeCheck === modal.NO) {
      countryPointIndex = State.getCountryPointIndexPrev()
      modalTypeCheck = State.getModalPrev()
    }
    if (points) {
      if (points(modalTypeCheck)[countryPointIndex]?.image) {
        return points(modalTypeCheck)[countryPointIndex]?.image
      } else {
        return points(modalTypeCheck)[0]?.image
      }
    } else {
      return null
    }
  }, [modalType, index])

  const name = useMemo((): string => {
    let modalTypeCheck = State.getModal()
    let countryPointIndex = State.getCountryPointIndex()
    if (modalTypeCheck === modal.NO) {
      countryPointIndex = State.getCountryPointIndexPrev()
      modalTypeCheck = State.getModalPrev()
    }
    if (points) {
      if (points(modalTypeCheck)[countryPointIndex]?.name) {
        return points(modalTypeCheck)[countryPointIndex]?.name
      } else {
        return points(modalTypeCheck)[0]?.name
      }
    } else {
      return null
    }
  }, [modalType, index])

  const modalActive = State.getModalActive()
  const modalTypePrev = State.getModalPrev()
  const modalActivePrev = State.getModalActivePrev()
  const indexPrev =  State.getCountryPointIndexPrev()
  const { x, y } = State.getIconPosition()
  const styleModal = useMemo((): {} => {
    if (modalActive && index !== null ) {
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
        transitionDelay: indexPrev === null && modalActivePrev ? '0.2s' : '0.6s',
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
  }, [index, x,y, modalActive, indexPrev, modalActivePrev])

  return (<>

      <div id="test" style={styleModal}>
        <img src={image} alt='attraction' className={styles.img} />
        <p className={styles.text}>{name}</p>

        <div className={styles.triangle}></div>
      </div>


  </>
  )
});

export default ModalPointer
