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
  return (
    <div className="main" >
      <FirstSection />
      <SecondSection />
      <ThirdSection  />
      <FourthSection  />
    </div>
  )
};

export default Main
