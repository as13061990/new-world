import styles from './FourthSection.module.css'

export const FourthSection = ({ innerRef }: any) => {

  return (
    <div ref={innerRef} className={"section " + styles.section} id='section4'>
      <h1>FourthSection</h1>
    </div>
  )
};

export default FourthSection
