import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FirstSection from "../sections/FirstSection/FirstSection";
import FourthSection from "../sections/FourthSection/FourthSection";
import SecondSection from "../sections/SecondSection/SecondSection";
import ThirdSection from "../sections/ThirdSection/ThirdSection";
import './Main.css'

export const Main = () => {
  // const isScrolling = useRef(false)
  // const blockRefs = [
  //     useRef(null),
  //     useRef(null),
  //     useRef(null),
  //     useRef(null),
  //   ]
  // const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  // const handleScrollCallback = useCallback((event: any) => {
  //   if (!isScrolling.current) {
  //     const container = event.target;
  //     const direction = container.scrollTop > container._prevScrollTop ? 'down' : 'up';
  //     container._prevScrollTop = container.scrollTop;
  //     if (direction === 'down') {
  //       if (activeBlockIndex === 3) return
  //       setActiveBlockIndex(prev => prev + 1)
  //       const block = blockRefs[activeBlockIndex + 1].current;
  //       //@ts-ignore
  //       block.scrollIntoView({ behavior: 'smooth' });
  //     } else {
  //       if (activeBlockIndex === 0) return
  //       setActiveBlockIndex(prev => prev - 1)
  //       const block = blockRefs[activeBlockIndex - 1].current;
  //       //@ts-ignore
  //       block.scrollIntoView({ behavior: 'smooth' });
  //     }
  //     isScrolling.current = true;
  //     setTimeout(function () {
  //       isScrolling.current = false;
  //     }, 400);
  //   }
  // }, [activeBlockIndex, blockRefs])

  const [scrollPosition, setScrollPosition] = useState(0);
  const scroll = () => {
    const element = document.querySelector('.main');
    //@ts-ignore
    const scrollTop = element.scrollTop;
    //@ts-ignore
    const scrollHeight = element.scrollHeight;
    //@ts-ignore
    const scrolledPercent = scrollTop / (scrollHeight - element.clientHeight) * 100;
    setScrollPosition(scrolledPercent)


    const element2 = document.getElementById('section2');
    //@ts-ignore
    const blockPosition = element2.getBoundingClientRect();
    // проверяем, виден ли блок на странице
    if (blockPosition.top >= 0 && blockPosition.bottom <= window.innerHeight) {
      // если блок виден, то выводим его текущие координаты в консоль
      console.log(`Блок находится на позиции (${blockPosition.left}, ${blockPosition.top})`);
    }

  }
  return (
    <div className="main" onScroll={scroll}>
      <p style={{ position: 'fixed', color: 'red', right: 0, zIndex: 100 }}>Current scroll position: {scrollPosition}</p>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </div>
  )
};

export default Main
