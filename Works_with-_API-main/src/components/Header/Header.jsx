import './Header.module.css'
import styles from './Header.module.css'

function Header() {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_logo}>
                    <img src="/public/LOGO.svg" alt="" />
                </div>
                <div className={styles.header_icon}>
                    <img className={styles.header_icon_special} src="/public/account.png" alt="" />
                    <img src="/public/basket.png" alt="" />
                    <img src="/public/favorites.png" alt="" />
                </div>
            </div>
            <div className={styles.menu}>
                <p>Home</p>
                <p>Catalogue</p>
                <p>build your box</p>
                <p>Services</p>
                <p>Photo & Video</p>
                <p>Payment & Delivery</p>
                <p>Guarantee & Return</p>
                <p>F.A.Q.</p>
                <p>Testimonials</p>
            </div>
            <div className={styles.category}>
                <p>Birthday gift</p>
                <p>Christmas</p>
                <p>New Year</p>
                <p>Wedding</p>
                <p>Valentine’s day</p>
                <p>Baby Shower</p>
                <p>Father’s Day</p>
                <p>Mother’s Day</p>
                <p>Easter</p>
            </div>

        </>
    )
}

export default Header
