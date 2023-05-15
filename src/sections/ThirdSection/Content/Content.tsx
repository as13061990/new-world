import styles from './Content.module.css'
import { observer } from "mobx-react-lite";
import BYInfo from '../../../assets/images/section-three-BR-info.png'
import State from '../../../store/State';
import Hint from './Hint/Hint';
export const Content = observer(() => {

  const index = State.getActiveCountryIndex()

  const stylesActiveContent = index !== -1 ? {
    transform: 'translate(calc(100%/4.7))',
    transition: '0.5s all ease;',
    transitionDelay: '0.2s',
    zIndex: 1
  } : {}

  return (
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
        <div className={styles.info_img_block}>
          
          <Hint/>
          <img className={styles.info_img} src={BYInfo} alt='country' />
        </div>
      </div>
    </div>
  )
});

export default Content
