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
                                <User size={24} />
                            </div>
                            <div>
                                <h2 className={styles.sectionTitle}>Profile Settings</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Update your personal information</p>
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
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.iconBox}>
                                <Bell size={24} />
                            </div>
                            <div>
                                <h2 className={styles.sectionTitle}>Notifications</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure how you receive alerts</p>
                            </div>
                        </div>

                        <div className={styles.checkboxGroup}>
                            {['Email Notifications', 'Push Notifications', 'Weekly Reports'].map((item) => (
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
                                <Shield size={24} />
                            </div>
                            <div>
                                <h2 className={styles.sectionTitle}>Security</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Protect your account</p>
                            </div>
                        </div>

                        <button className={styles.btnAction}>
                            Change Password
                        </button>
                    </div>

                </div>
            </div>
        </DashboardShell>
    );
}
