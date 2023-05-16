import styles from './FirstSection.module.css'
import earth from '../../assets/images/half-earth.png'
import arrow from '../../assets/images/section-one-arrow.svg'
import State from '../../store/State';
import { useEffect } from 'react';

export const FirstSection = ({ innerRef }: any) => {
  const platfotmClass = State.getIsMobile() ? styles.section_mobile : styles.section_dekstop

  return (
    <div className={styles.bg}>
      <div className={styles.blur_right}></div>
      <div className={styles.blur_left}></div>
      <div ref={innerRef} className={"section " + styles.section + ' ' + platfotmClass} id='section1'>
        <p className={styles.title}>НОВЫЙ МИР</p>
        <p className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis eros commodo, vehicula turpis eu, posuere diam. Duis et dapibus lacus. Morbi bibendum, nulla sed imperdiet lacinia, diam nibh mattis sapien, non vehicula nulla nisl et nibh. Sed ac tincidunt augue. Suspendisse dictum pulvinar purus sed eleifend. Sed eu suscipit nulla. Sed nec risus eget justo dapibus cursus in et nibh. </p>
       
        {/* <div className={styles.img_block}>
          <img src={earth} className={styles.img} alt='earth' />
          <div className={styles.button}>
            <img src={arrow} className={styles.arrow} alt='arrow' />
          </div>
        </div> */}
      </div>
      <div id='canvas_three' className={styles.canvas_three}></div>
    </div>
  )
};

export default FirstSection
