import { observer } from 'mobx-react';
import State from '../../../store/State';
import styles from './CountryItem.module.css'

interface ICountryItemProps {
  img: string;
  name: string;
  index: number;
}

export const CountryItem = observer(({ img, name, index }: ICountryItemProps) => {
  const clickHandler = () => {
    if (State.getActiveCountryIndex() === index) State.setActiveCountryIndex(-1)
    else State.setActiveCountryIndex(index)
  }

  const stylesActive = State.getActiveCountryIndex() === index ? {
    transform: `translateX(calc(100% * ${index} * -1))`,
    transition: '0.5s all ease;'
  } : State.getActiveCountryIndex() > index ? {
    transform: `translateX(calc(100% * ${index} * -1))`,
    transition: '0.5s all ease;'
  } : State.getActiveCountryIndex() < index && State.getActiveCountryIndex() !== -1 ? {
    transform: `translateX(calc(100% * (${6 - State.getActiveCountryIndex()}) - 130%))`,
    transition: '0.5s all ease;'
  } : {}




  return (
    <div className={styles.country} style={stylesActive} onClick={clickHandler}>
      <div className={styles.img_block}>
        <img src={img} alt={'countrybg'} className={styles.img} />

        <p className={styles.name}>{name}</p>

      </div>
    </div>
  )
});

export default CountryItem
