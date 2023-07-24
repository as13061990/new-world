import FirstSection from "../sections/FirstSection/FirstSection";
import SecondSection from "../sections/SecondSection/SecondSection";
import ThirdSection from "../sections/ThirdSection/ThirdSection";
import './Main.css'
import { observer } from "mobx-react-lite";
import State, { MAX_STEP } from "../store/State";
import { useEffect } from "react";

// const STEP_DELAY = 200

export const Main = observer(() => {
  useEffect(() => {
    let startY: number;
    let endY: number;

    function handleSwipe(start: number, end: number) {
      const threshold = 50; // Минимальный порог свайпа
      if (start - end > threshold) {
        State.plusStep()
        // console.log(State.getStep())
      } else if (end - start > threshold) {
        State.minusStep()
        // console.log(State.getStep())
      }

    }

    const onWheel = (event: WheelEvent): void => {
      console.log('wheel');
      // const time = new Date().getTime()

      if (State.isAnimation() === false) {
        
        if (event.deltaY > 0) {
          State.plusStep()
        } else if (event.deltaY < 0) {
          State.minusStep()
        }
      }
      // State.setScrollTimer(time)
    }
    if (State.getIsMobile()) {
      document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
      });

      document.addEventListener('touchend', (e) => {
        endY = e.changedTouches[0].clientY;
        handleSwipe(startY, endY);
      });
    } else {
      window.addEventListener('wheel', onWheel)
    }
    return () => {
      if (!State.getIsMobile()) {
        window.removeEventListener('wheel', onWheel)
      }
    }
  }, [])

  const clickButton = (top: boolean) => {
    console.log('button');
    if (State.isAnimation()) return
    if (!top) State.plusStep()
    else State.minusStep()
  }

  return (
    <div className="main" id='main' >
      <FirstSection />
      {State.getStep() >= MAX_STEP - 2 ? <SecondSection /> : null}
      {State.getStep() >= MAX_STEP - 1? <ThirdSection /> : null}
      <div className="button-top" onClick={() => clickButton(true)} />
      <div className="button-bottom" onClick={() => clickButton(false)}  />
    </div>
  )
});

export default Main
