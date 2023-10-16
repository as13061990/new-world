import styles from './ThirdSection.module.css'
import BY from '../../assets/images/section-three-BY.jpeg'
import BR from '../../assets/images/section-three-BR.jpeg'
import IN from '../../assets/images/section-three-IN.jpeg'
import CN from '../../assets/images/section-three-CN.jpeg'
import CS from '../../assets/images/section-three-CS.jpeg'
import ZA from '../../assets/images/section-three-ZA.jpeg'
import CountryItem from './CountryItem/CountryItem'
// import Footer from './Footer/Footer'
import Content from './Content/Content'
import State, { MAX_STEP } from '../../store/State'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const countries = [
  { img: ZA, name: "юар" },
  { img: BR, name: "бразилия" },
  { img: IN, name: "индия" },
  { img: BY, name: "беларусь" },
  { img: CS, name: "сербия" },
  { img: CN, name: "китай" },
]

export const ThirdSection = observer(() => {
  let sectionActiveClass = State.getStep() >= MAX_STEP - 1 ?
    State.getStep() >= MAX_STEP ? styles.activeFooter : styles.active
    : styles.inactive

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [])

  return (<>
    <div className={styles.section + ' ' + sectionActiveClass} id='section3'>
      <div className={sectionActiveClass === styles.active || sectionActiveClass === styles.activeFooter ? styles.blur_right : ''}></div>
      <div className={sectionActiveClass === styles.active || sectionActiveClass === styles.activeFooter ? styles.blur_left : ''}></div>

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
      <Content />
      <div className={styles.hr}></div>
    </div>
    {/* <Footer /> */}
  </>)
});

export default ThirdSection
