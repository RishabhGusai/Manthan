import Link from 'next/link';
import styles from '../login/Auth.module.css';

export default function Register() {
    return (
        <div className={styles.container}>
            <div className={styles.authBox}>
                <h1 className={styles.title}>Join Manthan</h1>
                <p className={styles.subtitle}>Start your streamlined trade journey</p>

                <form className={styles.form}>
                    <div className={styles.group}>
                        <label>Full Name</label>
                        <input type="text" placeholder="John Doe" className={styles.input} />
                    </div>
                    <div className={styles.group}>
                        <label>Email Address</label>
                        <input type="email" placeholder="you@example.com" className={styles.input} />
                    </div>
                    <div className={styles.group}>
                        <label>I am a...</label>
                        <select className={styles.input}>
                            <option>Exporter</option>
                            <option>Importer</option>
                            <option>Logistics Partner</option>
                            <option>Agent/Broker</option>
                        </select>
                    </div>
                    <div className={styles.group}>
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" className={styles.input} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Register</button>
                </form>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    Already have an account? <Link href="/login" style={{ color: 'var(--primary-red)' }}>Login</Link>
                </p>
            </div>
        </div>
    );
}
