
"use client";
import DashboardShell from '../../../components/DashboardShell';
import styles from './documents.module.css';
import { FileText, Eye, Download, CloudUpload } from 'lucide-react';
import { useGlobal } from '../../../context/GlobalContext';

export default function DocumentsPage() {
    const { documents, seedDatabase } = useGlobal();

    return (
        <DashboardShell>
            <div className={`animate-fade-in ${styles.container}`}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Documents</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Manage your digital trade contracts & invoices.</p>
                    </div>
                    <div className={styles.controls}>
                        <button onClick={seedDatabase} className={styles.actionBtn} style={{ background: 'rgba(255,255,255,0.1)', marginRight: '10px' }}>
                            <CloudUpload size={16} /> Sync / Init Data
                        </button>
                        <div className={styles.searchBar}>
                            <FileText size={18} style={{ opacity: 0.5 }} />
                            <input type="text" placeholder="Search documents..." className={styles.searchInput} />
                        </div>
                    </div>
                </div>

                <div className={styles.grid}>
                    {documents.length === 0 ? (
                        <div style={{ color: 'var(--text-muted)', colSpan: 3, padding: '2rem' }}>
                            No documents found. Click "Sync / Init Data" to restore defaults.
                        </div>
                    ) : documents.map((doc, index) => (
                        <div key={doc.id || index} className={styles.docCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconBox}>
                                    <FileText size={24} />
                                </div>
                                <span className={`${styles.statusPill} ${doc.status === 'Review' ? styles.statusPending : ''}`}>
                                    {doc.status || 'Verified'}
                                </span>
                            </div>

                            <div>
                                <h3 className={styles.docTitle}>{doc.title || `Document #${index}`}</h3>
                                <div className={styles.docMeta}>
                                    <span>{doc.type || 'PDF'} • {doc.size || '2MB'}</span>
                                    <span>•</span>
                                    <span>{doc.date ? new Date(doc.date).toLocaleDateString() : 'Recent'}</span>
                                </div>
                            </div>

                            <div className={styles.footer}>
                                <button className={`${styles.actionBtn} ${styles.btnSecondary}`}>
                                    <Eye size={16} /> View
                                </button>
                                <button className={`${styles.actionBtn} ${styles.btnPrimary}`}>
                                    <Download size={16} /> Save
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardShell>
    );
}
