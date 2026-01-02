"use client";
import DashboardShell from '../../../components/DashboardShell';
import styles from './documents.module.css';
import { FileText, Eye, Download } from 'lucide-react';

export default function DocumentsPage() {
    return (
        <DashboardShell>
            <div className={`animate-fade-in ${styles.container}`}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Documents</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your trade documents and contracts.</p>
                </div>

                <div className={styles.grid}>
                    {[1, 2, 3].map((item) => (
                        <div key={item} className={styles.docCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconBox}>
                                    <FileText size={24} />
                                </div>
                                <span className={styles.statusPill}>Verified</span>
                            </div>

                            <div>
                                <h3 className={styles.docTitle}>Commercial Invoice #{8830 + item}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Updated 2 hours ago</p>
                            </div>

                            <div className={styles.footer}>
                                <button className="btn btn-outline" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <Eye size={16} /> View
                                </button>
                                <button className="btn btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <Download size={16} /> Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardShell>
    );
}
