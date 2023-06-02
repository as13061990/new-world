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
  console.log(State.getIconPosition())
  return (
    <div id="test" style={{
      backgroundColor: 'red',
      position: 'absolute',
      left: State.getIconPosition().x - 55,
      top: State.getIconPosition().y - 115,
      width: 110,
      height: 95,
      borderRadius: 10
    }}>
      <img src={image} alt='attraction' className={styles.img} />
      <p className={styles.text}>{name}</p>

      <div className={styles.triangle}></div>
    </div>
  )
});

export default ModalPointer
