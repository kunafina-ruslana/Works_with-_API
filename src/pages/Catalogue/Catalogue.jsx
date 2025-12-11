import CardProduct from './components/CardProduct/CardProduct'
import styles from './Catalogue.module.css'
import Header from '../../components/Header/Header'


function Catalogue() {
  return (
    <>
      <Header/>
      <h2>All gift boxes</h2>
      <p className={styles.catalogue_p}>Our pre-designed collections have been hand curated for a number of special occasions. Whether you're gifting for an engagement, wedding, shower, housewarming, birthday or just because, our artisanal products and luxe packaging will be sure to wow your recipients.</p>
    <div className={styles.products}>
<CardProduct />
<CardProduct />
<CardProduct />
<CardProduct />
<CardProduct />
<CardProduct />
<CardProduct />
<CardProduct />
<CardProduct />

	</div>
	</>
  )
}

export default Catalogue