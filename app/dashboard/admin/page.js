"use client";
import React from 'react';
import DashboardShell from '../../../components/DashboardShell';
import styles from './admin.module.css';
import { ShieldAlert, Users, Activity, Eye, CheckCircle, CloudUpload } from 'lucide-react';
import { useGlobal } from '../../../context/GlobalContext';

export default function Admin() {
    const { trades, kycRequests, seedDatabase } = useGlobal();

    // Derived Stats
    const totalVolume = trades.reduce((acc, curr) => {
        // value format might be string "₹ 25,00,000" or number
        if (!curr.value) return acc;
        const val = typeof curr.value === 'string' ? parseFloat(curr.value.replace(/[^\d.]/g, '')) : curr.value;
        return acc + (isNaN(val) ? 0 : val);
    }, 0);

    // Quick formatter for large numbers (simulated)
    const formattedVolume = `₹ ${(totalVolume / 10000000).toFixed(1)} Cr`;

    const flaggedCount = trades.filter(t => t.risk === 'High' || t.status === 'Flagged').length;
    const flaggedTrade = trades.find(t => t.risk === 'High' || t.status === 'Flagged');

    return (
        <DashboardShell>
            <div className={`animate-fade-in ${styles.container}`}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Admin Console</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Platform monitoring, verification, and risk management.</p>
                    </div>
                    <div className={styles.adminBadge}>
                        <button onClick={seedDatabase} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', marginRight: '10px' }} title="Sync Default Data">
                            <CloudUpload size={14} />
                        </button>
                        <ShieldAlert size={16} style={{ display: 'inline', marginRight: '5px' }} /> ADMIN ACCESS
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.card}>
                        <div className={styles.statTitle}>Total Volume (All Time)</div>
                        <div className={styles.statValue}>{trades.length > 0 ? formattedVolume : '₹ 0'}</div>
                        <div style={{ fontSize: '0.8rem', color: '#00ff7f', marginTop: '0.5rem' }}>+12% vs yesterday</div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.statTitle}>Active Users (KYC)</div>
                        <div className={styles.statValue}>{kycRequests.length + 1240}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>85 currently online</div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.statTitle}>Flagged Transactions</div>
                        <div className={styles.statValue} style={{ color: '#FF0055' }}>{flaggedCount}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Requires immediate attention</div>
                    </div>
                </div>

                {flaggedTrade && (
                    <div className={styles.alertCard}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FF0055', marginBottom: '0.5rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            <ShieldAlert /> High Risk Fraud Alert detected
                        </h3>
                        <p style={{ color: 'white', marginBottom: '0.5rem' }}>
                            <strong>Trade ID: {flaggedTrade.id}</strong> ({flaggedTrade.user}) has been flagged for {flaggedTrade.reason || 'Security Check'}.
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            System detected parameters deviating from standard compliance norms.
                        </p>
                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
                            <button className={`${styles.actionBtn} ${styles.btnReject}`} style={{ padding: '0.6rem 1.2rem' }}>Block Trade</button>
                            <button className={styles.actionBtn} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '0.6rem 1.2rem', border: '1px solid rgba(255,255,255,0.1)' }}>View Audit Logs</button>
                        </div>
                    </div>
                )}

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h3 className={styles.tableTitle}><Activity size={20} color="var(--primary-accent)" /> Live Trade Feed</h3>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Trade ID</th>
                                    <th>Entity</th>
                                    <th>Value</th>
                                    <th>Risk Score</th>
                                    <th>Quick Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trades.map(trade => (
                                    <tr key={trade.id}>
                                        <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{typeof trade.id === 'string' ? trade.id.substring(0, 8) : trade.id}</td>
                                        <td>{trade.user}</td>
                                        <td>{trade.value}</td>
                                        <td className={trade.risk === 'High' ? styles.riskHigh : trade.risk === 'Medium' ? styles.riskMedium : styles.riskLow}>{trade.risk}</td>
                                        <td>
                                            <button className={styles.actionBtn} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.card}>
                        <h3 className={styles.tableTitle}><Users size={20} color="var(--primary-accent)" /> KYC Approvals</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {kycRequests.length === 0 ? "No pending requests." : kycRequests.map((user, i) => (
                                <div key={user.id || i} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <div style={{ fontWeight: '600', color: 'white' }}>{user.name}</div>
                                        <div style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>{user.type}</div>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>Doc: {user.doc}</div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className={`${styles.actionBtn} ${styles.btnApprove}`} style={{ flex: 1 }}>Approve</button>
                                        <button className={`${styles.actionBtn} ${styles.btnReject}`} style={{ flex: 1 }}>Reject</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
