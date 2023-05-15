import State from '../../../../store/State';
import styles from './Hint.module.css'
import { observer } from "mobx-react-lite";
export const Hint = observer(() => {
  const clickHandler = () => {
    State.openHint()
  }

  const stylesActiveBubble = State.getActiveHint() ? { opacity: 1 } : {transition: '0.3s all ease-out'}
  const stylesActivePointer = State.getActiveHint() ? { opacity: 1 } : {transition: '0.1s all ease-out'}
  return (
    <>
      <div className={styles.info_hint} onClick={clickHandler}>?</div>


      <div className={styles.bubble} style={stylesActiveBubble}>
        <p className={styles.bubble_text}>

          Листайте вниз, чтобы посмотреть другие страны
        </p>
      </div>
      <div style={stylesActivePointer} className={styles.pointer}></div>
    </>

  )
});

export default Hint
