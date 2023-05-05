import styles from './FourthSection.module.css'

export const FourthSection = ({ innerRef }: any) => {

  return (
    <div ref={innerRef} className={"section " + styles.section} id='section4'>
      <p className={styles.title}>НОВЫЙ МИР</p>
    </div>
  )
};

export default FourthSection
