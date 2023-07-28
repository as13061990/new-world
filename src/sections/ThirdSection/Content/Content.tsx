import styles from './Content.module.css'
import { observer } from "mobx-react-lite";
import BYInfo from '../../../assets/images/section-three-BR-info.png'
import State from '../../../store/State';
import { content } from '../../../types/enums';
import { useMemo } from 'react';
import * as platform from 'platform';

const brazil = {
  title: 'Бразилия',
  text: 'Бразилия — страна самбо и самбы, где первое — это название народа, а второе — естественно, танцы. На главном карнавальном шествии в этом году в ритме самбы участники буквально оттанцевали сцены из жизни созвучных потомков индейцев — самбо. Если вы не слышали о них, то точно знаете самых известных их представителей: Уго Чавеса и актера Дуэйна по прозвищу Скала. Насколько различны Бразилия и Россия по своему этническому составу, настолько схожи ментально, культурологически и даже экономически. Бразилия — наш самый западный союзник по БРИКС, но самый близкий по духу. '
}
const india = {
  title: 'Индия',
  text: 'Индия — самая многонаселённая страна мира, обогнавшая Китай, и самая многоязычная страна, говорящая на 400 наречиях. Мало кто знает, что именно по языковому принципу здесь развивается индустрия кино. Да, оказывается, это не только Болливуд, есть еще Толливуд, Колливуд, Сандалвуд, Бходжвуд, Джолливуд, Дхолливуд, Долливуд, Полливуд, Чхолливуд… и ещё много разных «вудов». В целом, Индия является для России отличным рынком по замещению западных товаров. И кто знает, может быть, совсем скоро, у нас появятся Боллинетфликс и Толлизон…'
}
const southAfrica = {
  title: 'Юар',
  text: 'ЮАР — самое яркое государство африканского континента. Жители Южной Африки называют себя "радужная нация". \n Здесь 11 официальных языков и люди всех цветов кожи уживаются под одним ярким флагом.\nПри этом мало кто знает, но Россию и Южную Африку объединяют более 100 лет совместной истории и деловых связей.'
}

export const Content = observer(() => {
  const index = State.getActiveCountryIndex()
  const stylesActiveContent = index !== content.NO ? {
    transform: 'translate(calc(100%/4.7))',
    transition: '0.5s all ease',
    transitionDelay: '0.2s',
    zIndex: 1
  } : {}

  const contentTexts = useMemo((): { title: string, text: string } => {
    let contentType = index
    if (index === content.NO) {
      const history = State.getHistoryCountries()
      if (history.length > 1) {
        contentType = history[history.length - 2]
      } else {
        return { title: '', text: '' }
      }
    }
    switch (contentType) {
      case (content.CHINA):
        return india
      case (content.INDIA):
        return india
      case (content.BELARUS):
        return india
      case (content.SERBIA):
        return india
      case (content.SOUTH_AFRICA):
        return southAfrica
      case (content.BRAZIL):
        return brazil
    }
  }, [index])

  const checkOS = platform.os.family.includes('OS') || platform.os.family.includes('Mac')
  const padding = checkOS ? styles.info_btn_ios : ''

  return (
    <div className={styles.content} style={stylesActiveContent}>
      <div className={styles.info}>
        <div className={styles.info_block}>
          <p className={styles.info_title}>{contentTexts.title}</p>
          <p className={styles.info_text}>{contentTexts.text}</p>

        </div>
        <div className={styles.info_img_block}>
          {/* <Hint/> */}
          <img className={styles.info_img} src={BYInfo} alt='country' />
          <div className={styles.buttons}>
            <div className={styles.info_btn + " " + padding}>Узнать больше о стране</div>
            <div className={styles.info_btn + " " + padding}>смотреть фильм</div>
          </div>
        </div>
      </div>
    </div>
  )
});

export default Content
