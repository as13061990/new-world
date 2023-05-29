import styles from './ThirdSection.module.css'
import BY from '../../assets/images/section-three-BY.png'
import BR from '../../assets/images/section-three-BR.png'
import IN from '../../assets/images/section-three-IN.png'
import CN from '../../assets/images/section-three-CN.png'
import CS from '../../assets/images/section-three-CS.png'
import ZA from '../../assets/images/section-three-ZA.png'
import CountryItem from './CountryItem/CountryItem'
import Footer from './Footer/Footer'
import Content from './Content/Content'
import State, { MAX_STEP } from '../../store/State'
import { observer } from 'mobx-react-lite'

const countries = [
  { img: BY, name: "беларусь" },
  { img: BR, name: "бразилия" },
  { img: IN, name: "индия" },
  { img: CN, name: "китай" },
  { img: CS, name: "сербия" },
  { img: ZA, name: "юар" },
]

export const ThirdSection = observer(() => {
  let sectionActiveClass = State.getStep() >= MAX_STEP + 2 ? 
  State.getStep() >= MAX_STEP + 3 ? styles.activeFooter : styles.active 
  : styles.inactive
  
  return (<>
    <div className={styles.section + ' ' + sectionActiveClass} id='section3'>
      <div className={styles.blur_right}></div>
      <div className={styles.blur_left}></div>

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
    <Footer />
  </>)
});

export default ThirdSection
