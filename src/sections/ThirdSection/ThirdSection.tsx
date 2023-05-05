import styles from './ThirdSection.module.css'
import BY from '../../assets/images/section-three-BY.png'
import BR from '../../assets/images/section-three-BR.png'
import IN from '../../assets/images/section-three-IN.png'
import CN from '../../assets/images/section-three-CN.png'
import CS from '../../assets/images/section-three-CS.png'
import ZA from '../../assets/images/section-three-ZA.png'
import BYInfo from '../../assets/images/section-three-BR-info.png'
import CountryItem from './CountryItem/CountryItem'
import { useState, useCallback, useEffect } from "react";
import { observer } from 'mobx-react-lite'
import State from '../../store/State'

const countries = [
  { img: BY, name: "беларусь" },
  { img: BR, name: "бразилия" },
  { img: IN, name: "индия" },
  { img: CN, name: "китай" },
  { img: CS, name: "сербия" },
  { img: ZA, name: "юар" },
]
let stylesActiveContent: any

export const ThirdSection = observer(() => {

  const index = State.getActiveCountryIndex()

  stylesActiveContent = index !== -1 ? {
    transform: 'translate(calc(100%/4.7))',
    transition: '0.5s all ease;',
    transitionDelay: '0.2s',
    zIndex: 1
  } : {}


  return (
    <div className={"section " + styles.section} id='section3'>
      {countries.map((country, i) => {
        return (
          <CountryItem
            key={i}
            img={country.img}
            name={country.name}
            index={i}
          />
        )
      })}

      <div className={styles.content} style={stylesActiveContent}>
        <div className={styles.title}>
          смотреть кино бесплатно и без смс
        </div>

        <div className={styles.info}>
          <div className={styles.info_block}>
            <p className={styles.info_title}>Беларусь</p>
            <p className={styles.info_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis eros commodo, vehicula turpis eu, posuere diam. Duis et dapibus lacus. Morbi bibendum, nulla sed imperdiet lacinia, diam nibh mattis sapien, non vehicula nulla nisl et nibh. Sed ac tincidunt augue. Suspendisse dictum pulvinar purus sed eleifend. Sed eu suscipit nulla. Sed nec risus eget justo dapibus cursus in et nibh.  Mauris nec diam at leo pellentesque dignissim et eu augue. Nunc in mattis nibh, et laoreet arcu. Aenean sit amet rhoncus risus. Etiam vitae pellentesque diam, nec porttitor eros. Aliquam vehicula diam a nisi sodales, sit amet feugiat dui vulputate. Vestibulum pulvinar ligula rutrum eros laoreet pellentesque. Aliquam </p>
            <p className={styles.info_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis eros commodo, vehicula turpis eu, posuere diam. Duis et dapibus lacus. Morbi bibendum, nulla sed imperdiet lacinia, diam nibh mattis sapien, non vehicula nulla nisl et nibh. Sed ac tincidunt augue. Suspendisse dictum pulvinar purus sed eleifend. Sed eu suscipit nulla. Sed nec risus eget justo dapibus cursus in et nibh.  Mauris nec diam at leo pellentesque dignissim et eu augue. Nunc in mattis nibh, et laoreet arcu. Aenean sit amet rhoncus risus. Etiam vitae pellentesque diam, nec porttitor eros. Aliquam vehicula diam a nisi sodales, sit amet feugiat dui vulputate. Vestibulum pulvinar ligula rutrum eros laoreet pellentesque. Aliquam </p>
            <div className={styles.info_btn}>
              смотреть фильм
            </div>
          </div>
          <div>
            <img className={styles.info_img} src={BYInfo} alt='country' />
          </div>
        </div>
      </div>


    </div>
  )
});

export default ThirdSection
