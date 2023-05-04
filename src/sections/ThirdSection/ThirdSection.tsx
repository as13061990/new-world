import styles from './ThirdSection.module.css'

export const ThirdSection = ({ innerRef }: any) => {

  return (
    <div ref={innerRef} className={"section " + styles.section} id='section3'>
      <h1>ThirdSection</h1>
    </div>
  )
};

export default ThirdSection
