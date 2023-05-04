import styles from './FirstSection.module.css'

export const FirstSection = ({ innerRef }: any) => {

  return (
    <div ref={innerRef} className={"section " + styles.section} id='section1'>
      <h1>FirstSection</h1>
    </div>
  )
};

export default FirstSection
