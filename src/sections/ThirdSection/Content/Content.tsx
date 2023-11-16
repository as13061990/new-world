import styles from './Content.module.css'
import { observer } from "mobx-react-lite";
import BYInfo from '../../../assets/images/section-three-BY-info.jpg'
import BRInfo from '../../../assets/images/section-three-BR-info.jpg'
import INInfo from '../../../assets/images/section-three-IN-info.jpg'
import SCInfo from '../../../assets/images/section-three-SС-info.jpeg'
import ZAInfo from '../../../assets/images/section-three-ZA-info.jpeg'
import CHInfo from '../../../assets/images/section-three-CH-info.jpg'

import State from '../../../store/State';
import { content } from '../../../types/enums';
import { useMemo } from 'react';
import * as platform from 'platform';

const brazil = {
  title: 'Бразилия',
  link: 'https://vk.com/video-24199209_456302864?t=47s',
  img: BYInfo,
  page: '/brazil/',
  text: 'Бразилия — страна самбо и самбы, где первое — это название народа, а второе — естественно, танцы. На главном карнавальном шествии в этом году в ритме самбы участники буквально оттанцевали сцены из жизни созвучных потомков индейцев — самбо. Если вы не слышали о них, то точно знаете самых известных их представителей: Уго Чавеса и актера Дуэйна по прозвищу Скала. Насколько различны Бразилия и Россия по своему этническому составу, настолько схожи ментально, культурологически и даже экономически. Бразилия — наш самый западный союзник по БРИКС, но самый близкий по духу. '
}
const india = {
  title: 'Индия',
  link: 'https://vk.com/video-24199209_456303310?t=16s',
  img: INInfo,
  page: '/india/',
  text: 'Индия — самая многонаселённая страна мира, обогнавшая Китай, и самая многоязычная страна, говорящая на 400 наречиях. Мало кто знает, что именно по языковому принципу здесь развивается индустрия кино. Да, оказывается, это не только Болливуд, есть еще Толливуд, Колливуд, Сандалвуд, Бходжвуд, Джолливуд, Дхолливуд, Долливуд, Полливуд, Чхолливуд… и ещё много разных «вудов». В целом, Индия является для России отличным рынком по замещению западных товаров. И кто знает, может быть, совсем скоро, у нас появятся Боллинетфликс и Толлизон…'
}
const southAfrica = {
  title: 'ЮАР',
  link: 'https://vk.com/video-24199209_456302464?t=12s',
  img: ZAInfo,
  page: '/africa/',
  text: 'ЮАР — самое яркое государство африканского континента. Жители Южной Африки называют себя "радужная нация". \n Здесь 11 официальных языков и люди всех цветов кожи уживаются под одним ярким флагом.\nПри этом мало кто знает, но Россию и Южную Африку объединяют более 100 лет совместной истории и деловых связей.'
}

const china = {
  title: 'Китай',
  link: 'https://vk.com/video-24199209_456304711',
  img: CHInfo,
  page: '/china/',
  text: 'Китай — самая древняя цивилизация на земле. В каждом китайце 5000 лет истории. А сегодня ещё и вся индустриальная мощь современного мира. В Поднебесной производят всё: от болта до паровоза. И сегодня у России с Китаем невероятно дружеские отношения. Китайцы обожают русскую культуру, восхищаются историей и с удовольствием скупают наши продукты. На международной арене государства придерживаются схожих взглядов и настаивают, что мир должен измениться и стать более справедливым.'
}

const serbia = {
  title: 'Сербия',
  link: 'https://vk.com/video-24199209_456304092',
  img: SCInfo,
  page: '/serbia/',
  text: 'Сербия — страна с яркими и трагичными периодами истории: от завоевания турками в XIV веке до бомбёжек NATO в XX веке. Но, несмотря на испытания, сербы сохранили свою нацию, свой выразительный характер. Жители этой страны считают себя настоящими друзьями России, и она отвечает им тем же, развивая в Сербии энергетику и помогая восстанавливать храмы. Вместе мы насчитываем тысячу лет совместной дружбы — может, поэтому сербы называют себя малыми русскими. '
}

const belarus = {
  title: 'Республика Беларусь',
  link: 'https://vk.com/video-24199209_456303769',
  img: BRInfo,
  page: '/belarus/',
  text: 'Беларусь — одно из самых молодых государств. На карте Европы оно появилось в 1991 году. Беларусь сохранила почти все промышленные предприятия-гиганты советских лет, что играет немаловажную роль в экономике страны. Сегодня Россия и Беларусь составляют Союзное государство. Уже сейчас в стране разрабатываются десятки проектов как в сфере импортозамещения, так и в сфере прорывных технологий. Белорусская промышленность и российские научные технологии смогут изменить мир.'
}

export const Content = observer(() => {
  const index = State.getActiveCountryIndex()
  const stylesActiveContent = index !== content.NO ? {
    transform: 'translate3d(0, 0, 0) translate(calc(100%/4.7))',
    transition: '0.5s transform ease',
    transitionDelay: '0.2s',
    zIndex: 1
  } : {}

  const contentTexts = useMemo((): { title: string, text: string, link: string, img: string, page: string } => {
    let contentType = index

    if (index === content.NO) {
      const history = State.getHistoryCountries()
      if (history.length > 1) {
        contentType = history[history.length - 2]
      } else {
        return { title: '', text: '', link: '', img: '', page: '' }
      }
    }

    switch (contentType) {
      case (content.CHINA):
        return china
      case (content.INDIA):
        return india
      case (content.BELARUS):
        return belarus
      case (content.SERBIA):
        return serbia
      case (content.SOUTH_AFRICA):
        return southAfrica
      case (content.BRAZIL):
        return brazil
    }
  }, [index])

  const checkOS = platform.os.family.includes('OS') || platform.os.family.includes('Mac') || platform.name.includes('Safari') || platform.name.includes('OS')

  const padding = checkOS ? '' : ''


  const metrikaFilm = () => {
    //@ts-ignore
    ym(95340418, 'reachGoal', 'film')
  }

  const metrikaPage = () => {
    //@ts-ignore
    ym(95340418, 'reachGoal', 'statya')
  }

  return (

    <div className={styles.content} style={stylesActiveContent}>
      <div className={styles.info_wrapper}>
        {/* <div className={styles.info}> */}
        <div className={styles.info_block}>
          <p className={styles.info_title}>{contentTexts.title}</p>
          <p className={styles.info_text}>{contentTexts.text}</p>

        </div>
        <div className={styles.info_img_block}>
          {/* <Hint/> */}
          <img className={styles.info_img} src={contentTexts.img} alt='country' key={contentTexts.img} />
          <div className={styles.buttons}>

            <a href={contentTexts.page} target='_blank' rel="noreferrer" className={styles.info_btn + " " + padding} onClick={() => { metrikaPage() }}>
                Узнать больше о стране
            </a>

            <a href={contentTexts.link} target='_blank' rel="noreferrer" className={styles.info_btn + " " + padding} onClick={() => { metrikaFilm() }}>
                смотреть фильм
            </a>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
});

export default Content
