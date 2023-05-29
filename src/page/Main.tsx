import FirstSection from "../sections/FirstSection/FirstSection";
import SecondSection from "../sections/SecondSection/SecondSection";
import ThirdSection from "../sections/ThirdSection/ThirdSection";
import './Main.css'
import { observer } from "mobx-react-lite";
import State from "../store/State";
import { useCallback, useEffect } from "react";

const STEP_DELAY = 200

export const Main = observer(() => {

  useEffect(() => {
    const onWheel = (event: WheelEvent): void => {
      const time = new Date().getTime()
      if (time - State.getScrollTimer() > STEP_DELAY) {
        console.log('scroll')
        if (event.deltaY > 0) {
          State.plusStep()
          console.log(State.getStep())
        } else if (event.deltaY < 0) {
          State.minusStep()
          console.log(State.getStep())
        }
      }
      State.setScrollTimer(time)
    }

    window.addEventListener('wheel', onWheel)
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div className="main" id='main' >
      <p style={{ position: 'fixed', color: 'red', right: 0, zIndex: 100 }}>Current step: {State.getStep()}</p>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </div>
  )
});

export default Main
