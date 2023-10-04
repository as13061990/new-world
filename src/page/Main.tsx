import FirstSection from "../sections/FirstSection/FirstSection";
import SecondSection from "../sections/SecondSection/SecondSection";
import ThirdSection from "../sections/ThirdSection/ThirdSection";
import './Main.css'
import { observer } from "mobx-react-lite";
import State, { MAX_STEP } from "../store/State";
import { useEffect } from "react";

export const Main = observer(() => {
  useEffect(() => {
    let startY: number;
    let endY: number;

    function handleSwipe(start: number, end: number) {
      const threshold = 50; // Минимальный порог свайпа
      if (start - end > threshold) {
        State.plusStep()
      } else if (end - start > threshold) {
        State.minusStep()
      }
    }

    const onWheel = (event: WheelEvent): void => {
      if (State.isAnimation() === false) {

        if (event.deltaY > 0) {
          State.plusStep()
        } else if (event.deltaY < 0) {
          State.minusStep()
        }
      }
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
    if (State.getStep() === 0 || State.getStep() >= 9) return
    if (State.getModalActive()) return
    if (State.isAnimation()) return
    if (!top) State.plusStep()
    else State.minusStep()
  }
  const bottomButton = () => {
    if (State.getStep() !== 0) return
    if (State.getModalActive()) return
    if (State.isAnimation()) return
    State.plusStep()
  }
  const planetSteps = State.getStep() > 0 && State.getStep() < 9;

  const buttonStyle = planetSteps && State.getModalActive() === false ? 'show-button' : 'hide-button';
  const bottomButtonStyle = State.getStep() === 0 ? 'show-button' : 'hide-button';
  return (
    <div className="main" id='main' >
      <FirstSection />
      {/* {State.getStep() >= MAX_STEP - 2 ? <SecondSection /> : null} */}
      {State.getStep() >= MAX_STEP - 2 ? <ThirdSection /> : null}
      <div className={"button-left " + buttonStyle} onClick={() => clickButton(true)}>
        <div className="dialog-container-left">
          <p>Покрутить</p>
        </div>
      </div>

      <div className={"button-right " + buttonStyle} onClick={() => clickButton(false)}>
        <div className="dialog-container-right">
          <p>Покрутить</p>
        </div>
      </div>

      <div className={"button_bottom " + bottomButtonStyle} onClick={() => bottomButton()}></div>
    </div>
  )
});

export default Main
