import styles from './CardProduct.module.css'

function CardProduct({ product }) {
  return (
    <div className={styles.card} key={product.id}>
      <img src={product.image} alt={product.name} />
      <div className={styles.description}>
      <h3 className={styles.title}>{product.name}</h3>
      <p className={styles.price}>{product.description && product.description.length > 150
        ? product.description.substring(0, 80) + "..."
        : product.description || "Описание отсутствует"}</p>
      <button>Купить</button>
    </div>
    </div >
  );
}

export default CardProduct;
