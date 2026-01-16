"use client";
import DashboardShell from '../../../components/DashboardShell';
import styles from './settings.module.css';
import { User, Bell, Shield, Key } from 'lucide-react';

export default function SettingsPage() {
    return (
        <DashboardShell>
            <div className={`animate-fade-in ${styles.container}`}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Settings</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your account preferences and security.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

                    {/* Profile Section */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.iconBox}>
                                <User size={26} />
                            </div>
                            <div>
                                <h2 className={styles.sectionTitle}>Profile Configuration</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Update your personal identity and contact info.</p>
                            </div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Full Name</label>
                                <input type="text" defaultValue="John Doe" className={styles.input} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email Address</label>
                                <input type="email" defaultValue="john@example.com" className={styles.input} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Role / Position</label>
                                <input type="text" defaultValue="Senior Logistics Manager" className={styles.input} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Company ID</label>
                                <input type="text" defaultValue="MNTH-8832-X" className={styles.input} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.iconBox}>
                                <Bell size={26} />
                            </div>
                            <div>
                                <h2 className={styles.sectionTitle}>Notifications Center</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure how you receive critical alerts.</p>
                            </div>
                        </div>

                        <div className={styles.checkboxGroup}>
                            {['Email Notifications', 'Push Notifications', 'Weekly Analytics Reports', 'High Priority Alerts Only'].map((item) => (
                                <label key={item} className={styles.checkboxLabel}>
                                    <input type="checkbox" defaultChecked className={styles.checkbox} />
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Security */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.iconBox}>
                                <Shield size={26} />
                            </div>
                            <div>
                                <h2 className={styles.sectionTitle}>Security & Access</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Protect your account with 2FA and encryption.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <button className={styles.btnAction}>
                                <Key size={18} /> Change Password
                            </button>
                            <button className={styles.btnAction} style={{ background: 'transparent', border: '1px solid var(--primary-accent)', color: 'white' }}>
                                <Shield size={18} /> Enable 2FA
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardShell>
    );
}
