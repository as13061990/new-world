import FirstSection from "../sections/FirstSection/FirstSection";
import SecondSection from "../sections/SecondSection/SecondSection";
import ThirdSection from "../sections/ThirdSection/ThirdSection";
import './Main.css'
import { observer } from "mobx-react-lite";
import State from "../store/State";

export const Main = observer(() => {
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


  const scroll = () => {
    const main = document.querySelector('.main') as HTMLElement;
    const section1 = document.getElementById('section1') as HTMLElement;

    const scrollTop = main.scrollTop;

    const precent = scrollTop / (section1.scrollHeight) * 100
    State.setScrollPrecent(precent)
    console.log(State.getScrollPrecent())

  }
  return (
    <div className="main" onScroll={scroll}>
      <p style={{ position: 'fixed', color: 'red', right: 0, zIndex: 100 }}>Current scroll position: {State.getScrollPrecent()}</p>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </div>
  )
});

export default Main
