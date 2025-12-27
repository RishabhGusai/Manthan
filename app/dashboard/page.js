"use client";
import DashboardShell from '../../components/DashboardShell';
import styles from './dashboard.module.css';
import { TrendingUp, AlertCircle, Package, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { useGlobal } from '../../context/GlobalContext';

export default function Dashboard() {
    const { trades } = useGlobal();

    return (
        <DashboardShell>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
                <p style={{ color: 'var(--text-muted)' }}>Welcome back, John. Here's what's happening today.</p>
            </div>

            <div className={styles.grid}>
                {/* Stats Row */}
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Active Trades</div>
                    <div className={styles.statValue}>{trades.length}</div>
                    <div style={{ color: '#4ade80', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <TrendingUp size={16} /> +{trades.filter(t => new Date(t.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} this week
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Pending Actions</div>
                    <div className={styles.statValue} style={{ color: '#ffd700' }}>4</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        2 docs awaiting approval
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Shipments in Transit</div>
                    <div className={styles.statValue} style={{ color: 'var(--primary-neon)' }}>
                        {trades.filter(t => t.status === 'In Transit').length}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <Package size={16} style={{ display: 'inline', marginRight: '5px' }} /> 3 arriving today
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Total Revenue (YTD)</div>
                    <div className={styles.statValue}>$1.2M</div>
                    <div style={{ color: '#4ade80', fontSize: '0.9rem' }}>
                        +18% vs last year
                    </div>
                </div>

                {/* Second Row: Active Trades Table (Spans 2 cols) */}
                <div className={styles.widget} style={{ gridColumn: 'span 2' }}>
                    <div className={styles.widgetTitle}>
                        Active Shipments
                        <Link href="/dashboard/trades" style={{ fontSize: '0.9rem', color: 'var(--primary-neon)' }}>View All</Link>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Ref ID</th>
                                <th>Destination</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trades.slice(0, 5).map((trade) => (
                                <tr key={trade.id}>
                                    <td>#{trade.id}</td>
                                    <td>{trade.destination}</td>
                                    <td>
                                        <span className={`${styles.statusPill} ${trade.status === 'In Transit' || trade.status === 'Dispatched' ? styles.statusActive : styles.statusPending
                                            }`}>
                                            {trade.status}
                                        </span>
                                    </td>
                                    <td>{trade.date}</td>
                                </tr>
                            ))}
                            {trades.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                        No active trades found. Start a new trade!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pending Documents (Spans 1 col) */}
                <div className={styles.widget} style={{ gridColumn: 'span 1' }}>
                    <div className={styles.widgetTitle}>
                        Pending Documents
                    </div>
                    <div className={styles.docItem}>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Commercial Invoice</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>#TRD-9011 • Hamburg</div>
                        </div>
                        <AlertCircle size={18} color="#ffd700" />
                    </div>
                    <div className={styles.docItem}>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Certificate of Origin</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>#TRD-9011 • Hamburg</div>
                        </div>
                        <AlertCircle size={18} color="#ffd700" />
                    </div>
                    <Link href="/dashboard/documents/ai-wizard" className="btn btn-primary" style={{ marginTop: 'auto', textAlign: 'center', borderRadius: '12px' }}>
                        Auto-Generate via AI
                    </Link>
                </div>

                {/* Logistics Map Preview (Spans 1 col) */}
                <div className={styles.widget} style={{ gridColumn: 'span 1', padding: 0, overflow: 'hidden', position: 'relative' }}>
                    {/* Placeholder Map Image */}
                    <div style={{
                        width: '100%', height: '100%',
                        background: 'url(/images/dashboard.png) center/cover',
                        opacity: 0.6
                    }} />
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        padding: '1rem',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                    }}>
                        <div style={{ fontWeight: 'bold' }}>Live Logistics Map</div>
                        <div style={{ fontSize: '0.8rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }} />
                            System Active
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
