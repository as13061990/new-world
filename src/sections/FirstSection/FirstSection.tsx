import styles from './FirstSection.module.css'
import earth from '../../assets/images/half-earth.png'
export const FirstSection = ({ innerRef }: any) => {

  return (
    <div className={styles.bg}>
      <div ref={innerRef} className={"section " + styles.section} id='section1'>
        <p className={styles.title}>НОВЫЙ МИР</p>
        <p className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis eros commodo, vehicula turpis eu, posuere diam. Duis et dapibus lacus. Morbi bibendum, nulla sed imperdiet lacinia, diam nibh mattis sapien, non vehicula nulla nisl et nibh. Sed ac tincidunt augue. Suspendisse dictum pulvinar purus sed eleifend. Sed eu suscipit nulla. Sed nec risus eget justo dapibus cursus in et nibh. </p>
        <img src={earth} className={styles.img} alt='earth' />
      </div>
    </div>
  )
};

export default FirstSection
