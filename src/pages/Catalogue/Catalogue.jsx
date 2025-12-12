import { useEffect, useState } from 'react';
import CardProduct from './components/CardProduct/CardProduct'
import CreateProductForm from './components/CreateProductForm/CreateProductForm'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import styles from './Catalogue.module.css'
import axios from 'axios';

function Catalogue() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showCreateForm, setShowCreateForm] = useState(false);
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					"https://torguisam.ru/api/product/oksei-all-products"
				);
				setProducts(response.data.slice(0, 50));
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};
		fetchProducts();
	}, []); 
	
	const refreshProducts = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				"https://torguisam.ru/api/product/oksei-all-products"
			);
			setProducts(response.data.slice(0, 10));
			setLoading(false);
		} catch (err) {
			console.error("Ошибка при обновлении товаров:", err);
			setError(err.message);
			setLoading(false);
		}
	};
	const handleProductCreated = (newProduct) => {
		refreshProducts();
		setShowCreateForm(false);
	};

	if (loading) return <div className="loading">Загрузка товаров...</div>;
	
	if (error) return <div className="error">Ошибка: {error}</div>;
	return (
		<div className="App">
			<Header/>
			<h2 className={styles.title_head}>All gift boxes</h2>
			<p className={styles.title_descr}>Our pre-designed collections have been hand curated for a number of special occasions. Whether you're gifting for an engagement, wedding, shower, housewarming, birthday or just because, our artisanal products and luxe packaging will be sure to wow your recipients.</p>
      <div className={styles.products}>
				{products.map((product) => (
					<CardProduct key={product.id} product={product} />
				))}
			</div>
      <div className={styles.create_product_section}>
				<button className={styles.button}
					onClick={() => setShowCreateForm(!showCreateForm)}
				>
					{showCreateForm ? "Скрыть форму" : "Создать новый товар"}
				</button>
			</div>
			{showCreateForm && (
				<CreateProductForm onProductCreated={handleProductCreated} />
			)}
			<Footer/>
		</div>
	);
}

export default Catalogue