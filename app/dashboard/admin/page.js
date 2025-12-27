"use client";
import React from 'react';
import DashboardShell from '../../../components/DashboardShell';
import styles from './admin.module.css';
import { ShieldAlert, Users, Activity, Eye, CheckCircle, XCircle } from 'lucide-react';

export default function Admin() {
    const recentTrades = [
        { id: 'TRD-9921', user: 'ExportCo India', value: '₹ 25L', risk: 'Low', status: 'Processing' },
        { id: 'TRD-9922', user: 'Global Gems', value: '₹ 1.2Cr', risk: 'High', status: 'Flagged' },
        { id: 'TRD-9923', user: 'Textile Hub', value: '₹ 8L', risk: 'Low', status: 'Cleared' },
    ];

    const pendingUsers = [
        { name: 'Rahul Traders', doc: 'GST Certificate', type: 'Exporter' },
        { name: 'Dubai Imports LLC', doc: 'Incorp. Docs', type: 'Importer' }
    ];

    return (
        <DashboardShell>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1>Admin & Compliance</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Platform monitoring, verification, and risk management.</p>
                    </div>
                    <div className={styles.adminBadge}>ADMIN MODE</div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.card}>
                        <div style={{ color: 'var(--text-muted)' }}>Total Volume (Today)</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹ 14.2 Cr</div>
                    </div>
                    <div className={styles.card}>
                        <div style={{ color: 'var(--text-muted)' }}>Active Users</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>1,240</div>
                    </div>
                    <div className={styles.card}>
                        <div style={{ color: 'var(--text-muted)' }}>Flagged Txns</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FF0055' }}>3</div>
                    </div>
                </div>

                <div className={styles.alertCard}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FF0055', marginBottom: '1rem' }}>
                        <ShieldAlert /> High Risk Fraud Alert
                    </h3>
                    <p><strong>Trade ID: TRD-9922</strong> (Global Gems) has been flagged for potential "Over-Invoicing".</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Mismatch between declared goods value and market benchmarks. Recommended Action: Manual Audit.</p>
                    <div style={{ marginTop: '1rem' }}>
                        <button className={`${styles.actionBtn} ${styles.btnReject}`} style={{ border: '1px solid #FF0055' }}>Block Trade</button>
                        <button className={styles.actionBtn} style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>View Details</button>
                    </div>
                </div>

                <div className={styles.grid} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                    <div className={styles.card}>
                        <h3 className={styles.tableTitle}><Activity size={18} style={{ display: 'inline' }} /> Live Trade Feed</h3>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Value</th>
                                    <th>Risk Score</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTrades.map(trade => (
                                    <tr key={trade.id}>
                                        <td>{trade.id}</td>
                                        <td>{trade.user}</td>
                                        <td>{trade.value}</td>
                                        <td className={trade.risk === 'High' ? styles.riskHigh : styles.riskLow}>{trade.risk}</td>
                                        <td>
                                            <button className={styles.actionBtn} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                                                <Eye size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.card}>
                        <h3 className={styles.tableTitle}><Users size={18} style={{ display: 'inline' }} /> KYC Approvals</h3>
                        {pendingUsers.map((user, i) => (
                            <div key={i} style={{ padding: '0.8rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.type} • Doc: {user.doc}</div>
                                <div style={{ marginTop: '0.5rem' }}>
                                    <button className={`${styles.actionBtn} ${styles.btnApprove}`}><CheckCircle size={14} /></button>
                                    <button className={`${styles.actionBtn} ${styles.btnReject}`}><XCircle size={14} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
