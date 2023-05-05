import styles from './CountryItem.module.css'

interface ICountryItemProps {
  img: string;
  name: string;
}

export const CountryItem = ({ img, name }: ICountryItemProps) => {
  return (
    <div className={styles.country}>
      <div className={styles.img_block}>
        <img src={img} alt={'countrybg'} className={styles.img} />

        <p className={styles.name}>{name}</p>

      </div>
    </div>
  )
};

export default CountryItem
