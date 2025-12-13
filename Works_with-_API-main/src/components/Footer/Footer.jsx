import './Footer.module.css'
import styles from './Footer.module.css'

function Footer() {
	return (
		<>
			<div className={styles.footer}>
				<div className={styles.footer_columns}>
					<div className={styles.home}>
						<p>Home</p>
						<p>Catalogue</p>
						<p>Services</p>
						<p>Payment</p>
						<p>Delivery</p>
						<p>Return</p>
						<p>Privacy policy</p>
						<p>Terms & Conditions</p>
					</div>
					<div className={styles.birthday}>
						<p>Birthday Gift</p>
						<p>Christmas </p>
						<p>New Year</p>
						<p>Wedding</p>
						<p>Valentine’s Day</p>
						<p>Baby Shower</p>
						<p>Mother’s Day</p>
						<p>Father’s Day</p>
					</div>
					<div className={styles.information}>
						<p>Information</p>
						<p>Simple Brown Box Ltd</p>
						<p>Flat 44</p>
						<p> Manley Heights</p>
						<p>1 South Way</p>
						<p>Wembley</p>
						<p>HA9 0JU </p>
						<p>Phone: +44 1234567899</p>
						<p>Company@SimpleBrownBox.co.uk </p>
						<p>Service@SimpleBrownBox.co.uk    </p>
						<p>Hello@SimpleBrownBox.co.uk   </p>
					</div>
					<div className={styles.account}>
						<p>Registration</p>
						<p>Log ind</p>
						<p>My wishlist</p>
						<p> View bag</p>
					</div>
				</div>
				<hr />
				<p>Copyright © 2022 «Simple Brown Box»</p>
			</div>

		</>
	)
}

export default Footer
