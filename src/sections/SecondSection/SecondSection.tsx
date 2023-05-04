import styles from './SecondSection.module.css'

export const SecondSection = ({ innerRef }: any) => {

  return (
    <div ref={innerRef} className={"section " + styles.section} id='section2'>
      <h1>SecondSection</h1>
    </div>
  )
};

export default SecondSection
