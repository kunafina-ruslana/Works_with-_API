import { useEffect, useState } from 'react';
import CardProduct from './components/CardProduct/CardProduct'
import CreateProductForm from './components/CreateProductForm/CreateProductForm'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import styles from './Catalogue.module.css'
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

function Catalogue() {
	const [isVisible, setIsVisible] = useState(true);
	const [selectedItem, setSelectedItem] = useState(null);
	const [count, setCount] = useState(0);
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

	const complexVariants = {
		animate: {
			x: [0, 1400, 0],
			y: [0, 0, 0],
			transition: {
				duration: 2,
				repeat: Infinity,
				repeatType: "reverse",
			},
		},
	};
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.2,
				staggerChildren: 0.1,
			},
		},
	};
	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 100 },
		},
	};
	return (
		<div className="App">
			<Header />
			<h2 className={styles.title_head}>All gift boxes</h2>
			
			<p className={styles.title_descr}>Our pre-designed collections have been hand curated for a number of special occasions. Whether you're gifting for an engagement, wedding, shower, housewarming, birthday or just because, our artisanal products and luxe packaging will be sure to wow your recipients.</p>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className={styles.products}>
				{products.map((product) => (
					<motion.div
						variants={itemVariants}>
						<CardProduct key={product.id} product={product} />
					</motion.div>

				))}
			</motion.div>
			<div className={styles.create_product_section}>
				<button className={styles.button}
					onClick={() => setShowCreateForm(!showCreateForm)}>
					{showCreateForm ? "Скрыть форму" : "Создать новый товар"}
				</button>
			</div>
			{showCreateForm && (<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{ duration: 0.3 }}
			>
				<CreateProductForm onProductCreated={handleProductCreated} />
			</motion.div>
			)}

			<section>
				<p>Вам нравится наш сайт?</p>
				<div className={styles.cool} >
					<button className={styles.button} onClick={() => setIsVisible(!isVisible)}>ДА</button>
                <AnimatePresence>
                    {!isVisible && (
                        <motion.div
						className={styles.p_cool}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            Вы молодечик!
                        </motion.div>
                    )}
                </AnimatePresence>
				</div>
				
				<motion.div className="complex-box" variants={complexVariants} animate="animate"><button className={styles.button}>Нет</button></motion.div>
			</section>
			<Footer />
		</div>
	);
}

export default Catalogue