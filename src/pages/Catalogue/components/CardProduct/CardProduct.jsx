import styles from './CardProduct.module.css'

function CardProduct() {
  return (
    <div className={styles.card}>
      <img src="/card.jpg" alt="Gift box" />
      <p className={styles.title}>GIFT BOX</p>
      <p className={styles.price}>£ 80</p>
    </div>
  );
}

export default CardProduct;
