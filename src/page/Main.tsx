import FirstSection from "../sections/FirstSection/FirstSection";
import SecondSection from "../sections/SecondSection/SecondSection";
import ThirdSection from "../sections/ThirdSection/ThirdSection";
import './Main.css'
import { observer } from "mobx-react-lite";
import State from "../store/State";
import { useCallback } from "react";

export const Main = observer(() => {

  const scroll = useCallback(() => {
    const main = document.querySelector('.main') as HTMLElement;
    const section1 = document.getElementById('section1') as HTMLElement;

    const scrollTop = main.scrollTop;

    const precent = scrollTop / (section1.scrollHeight) * 100

    if (precent >= 100) {
      section1.classList.add('first_section_disable');
      section1.classList.remove('first_section_active');
    } else if (precent === 0) {
      section1.classList.add('first_section_active');
      section1.classList.remove('first_section_disable');
    }
    State.setScrollPrecent(precent)
  }, [])

  return (
    <div className="main" id='main' onScroll={scroll}>
      <p style={{ position: 'fixed', color: 'red', right: 0, zIndex: 100 }}>Current scroll position: {State.getScrollPrecent()}</p>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </div>
  )
});

export default Main
