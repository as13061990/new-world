import FirstSection from "../sections/FirstSection/FirstSection";
import SecondSection from "../sections/SecondSection/SecondSection";
import ThirdSection from "../sections/ThirdSection/ThirdSection";
import './Main.css'
import { observer } from "mobx-react-lite";
import State from "../store/State";
import { useCallback } from "react";

function calc(t: any, b: any, c: any, d: any) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};
const scrollTo = (element: HTMLElement, to: number, duration: number) => {
  const start = element.scrollTop;
  const change = to - start;
  let currentTime = 0;
  const increment = 20;

  const animateScroll = () => {
    currentTime += increment;
    const val = calc(currentTime, start, change, duration);
    element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };

  animateScroll();
};


export const Main = observer(() => {

  const scroll = useCallback(() => {
    const main = document.querySelector('.main') as HTMLElement;
    const section1 = document.getElementById('section1') as HTMLElement;
    const scrollTop = main.scrollTop;
    const precent = scrollTop / (section1.scrollHeight) * 100

    State.setScrollPrecent(precent)

    if (precent >= 99.99) {
      if (precent > 100) return

      const scrollPosition = main.scrollTop;
      const oldScrollHeight = section1.scrollHeight;

      section1.style.scrollMarginBottom = "100vh";
      const newScrollHeight = section1.scrollHeight;
      const newScrollTop = (scrollPosition / oldScrollHeight) * newScrollHeight;

      main.scrollTop = newScrollTop;
    } else if (precent <= 1) {
      section1.style.scrollMarginBottom = '15vh';
    }

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
