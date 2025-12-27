import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src="/logo.jpg" alt="Manthan Logo" style={{ height: '40px' }} />
                    <span className={styles.manthan}>Manthan</span>
                </Link>
                <div className={styles.links}>
                    <Link href="/" className={styles.link}>Home</Link>
                    <Link href="/about" className={styles.link}>About</Link>
                    <Link href="/services" className={styles.link}>Services</Link>
                    <Link href="/pricing" className={styles.link}>Pricing</Link>
                    <Link href="/login" className={`btn btn-outline ${styles.loginBtn}`}>Login</Link>
                    <Link href="/register" className={`btn btn-primary ${styles.registerBtn}`}>Get Started</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
