import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.brand}>
                    <h3>Manthan</h3>
                    <p>Trade made easy – from paperwork to payment.</p>
                </div>
                <div className={styles.column}>
                    <h4>Platform</h4>
                    <Link href="/services">Services</Link>
                    <Link href="/pricing">Pricing</Link>
                    <Link href="/dashboard">Dashboard</Link>
                </div>
                <div className={styles.column}>
                    <h4>Company</h4>
                    <Link href="/about">About Us</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/careers">Careers</Link>
                </div>
                <div className={styles.column}>
                    <h4>Legal</h4>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                </div>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} Manthan. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
