import { observer } from 'mobx-react';
import State, { MAX_STEP } from '../../../store/State';
import styles from './CountryItem.module.css'
import { content } from '../../../types/enums';

interface ICountryItemProps {
  img: string;
  name: string;
  index: number;
}

export const CountryItem = observer(({ img, name, index }: ICountryItemProps) => {
  const clickHandler = () => {
    if (State.getActiveCountryIndex() === index) State.setActiveCountryIndex(content.NO)
    else State.setActiveCountryIndex(index)
    State.setStep(MAX_STEP)
  }

  const stylesActiveImg = State.getActiveCountryIndex() === index ? {
    transform: `translateX(calc(100% * ${index} * -1))`,
    transition: '0.5s all ease',
    zIndex: 10
  } : State.getActiveCountryIndex() > index ? {
    transform: `translateX(calc(100% * ${index} * -1))`,
    transition: '0.5s all ease',
    zIndex: 10
  } : State.getActiveCountryIndex() < index && State.getActiveCountryIndex() !== -1 ? {
    transform: `translateX(calc(100% * (${6 - State.getActiveCountryIndex()}) - 130%))`,
    transition: '0.5s all ease',
    zIndex: 10
  } : {}
  const flip = State.getActiveCountryIndex() === index;

  return (
    <div className={styles.country} >
      <div className={styles.img_block} onClick={clickHandler} style={stylesActiveImg}>
        <img src={img} alt={'countrybg'} className={styles.img} />
        <p className={styles.name}>{name}</p>
        <div className={ flip ? styles.button_content_flip : styles.button_content}></div>
      </div>
    </div>
  )
});

export default CountryItem
