"use client";
import DashboardShell from '../../components/DashboardShell';
import styles from './dashboard.module.css';
import { TrendingUp, AlertCircle, Package, Activity, Wind, Droplets, Zap, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { useGlobal } from '../../context/GlobalContext';

export default function Dashboard() {
    const { trades } = useGlobal();

    return (
        <DashboardShell>
            {/* Page Header Overlay */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    marginBottom: '0.5rem'
                }}>
                    <span style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '0.2rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>Platform A</span>
                </div>
                <h1 className={styles.overlayTitle}>
                    Global Operations - Singapore
                    <span style={{ fontSize: '1rem', fontWeight: '400', color: 'var(--text-secondary)', marginLeft: '1rem' }}>
                        14:23 UTC | Day Shift
                    </span>
                </h1>
            </div>

            <div className={styles.grid}>
                {/* 1. Primary Recommendation (Large Left Card) - Spans 2 cols, 2 rows */}
                <div className={`${styles.widget} ${styles.recommendationCard}`} style={{ gridColumn: 'span 1', gridRow: 'span 2', minHeight: '400px' }}>
                    <div className={styles.widgetTitle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ padding: '5px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                                <Zap size={18} color="#fff" />
                            </div>
                            AI Operations Assistant
                        </div>
                        <Activity size={18} />
                    </div>

                    {/* Simulated 3D Graphic */}
                    <div style={{
                        flex: 1,
                        background: 'url(/images/tech_schematic_pump.png) center/contain no-repeat',
                        filter: 'drop-shadow(0 0 10px rgba(0, 242, 255, 0.2))',
                        mixBlendMode: 'screen', // This makes the black background disappear!
                        opacity: 1,
                        margin: '1rem 0'
                    }} />

                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>
                            Primary Recommendation
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: '1.5' }}>
                            Reschedule non-critical maintenance on <span style={{ color: '#fff', fontWeight: 'bold' }}>Pump P-23</span> to 02:00-04:00. Estimated production impact reduction: <span style={{ color: '#fff', fontWeight: 'bold' }}>+2.7%</span>.
                        </p>
                    </div>
                </div>

                {/* 2. Top Right Stats (Live Status) - Spans 2 cols */}
                <div className={styles.widget} style={{ gridColumn: 'span 1' }}>
                    <div className={styles.widgetTitle}>
                        Oil Production
                        <TrendingUp size={16} color="var(--primary-accent)" />
                    </div>
                    <div className={styles.statValue}>89,200 <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>bbl</span></div>

                    {/* Sparkline Simulation */}
                    <svg viewBox="0 0 100 20" style={{ width: '100%', height: '40px', overflow: 'visible' }}>
                        <path d="M0,15 Q10,5 20,10 T40,15 T60,5 T80,12 T100,2" className={styles.sparkline} />
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'var(--primary-accent)', stopOpacity: 0.2 }} />
                            <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                        </linearGradient>
                        <path d="M0,15 Q10,5 20,10 T40,15 T60,5 T80,12 T100,2 V20 H0 Z" fill="url(#grad1)" />
                    </svg>

                    <div style={{ color: 'var(--primary-accent)', fontSize: '0.8rem', marginTop: 'auto' }}>+4.2% vs target</div>
                </div>

                <div className={styles.widget} style={{ gridColumn: 'span 1' }}>
                    <div className={styles.widgetTitle}>
                        Gas Output
                        <Activity size={16} color="var(--accent-yellow)" />
                    </div>
                    <div className={styles.statValue}>12.4 <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>MMSCF</span></div>
                    {/* Sparkline Simulation */}
                    <svg viewBox="0 0 100 20" style={{ width: '100%', height: '40px', overflow: 'visible' }}>
                        <path d="M0,10 Q10,15 20,12 T40,5 T60,10 T80,15 T100,5" stroke="var(--accent-yellow)" strokeWidth="2" fill="none" />
                    </svg>
                    <div style={{ color: 'var(--accent-yellow)', fontSize: '0.8rem', marginTop: 'auto' }}>-1.1% deviation</div>
                </div>

                <div className={styles.widget} style={{ gridColumn: 'span 1' }}>
                    <div className={styles.widgetTitle}>Uptime (Last 24h)</div>
                    <div className={styles.statValue}>97.8%</div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1rem' }}>
                        <div style={{ width: '97.8%', height: '100%', background: 'var(--primary-accent)', borderRadius: '3px', boxShadow: '0 0 10px var(--primary-accent)' }} />
                    </div>
                </div>


                {/* 3. Critical Equipment Health (Right Middle List) - Spans 1 Col, 2 Rows? 
                    Actually let's make the "Critical Health" span 1 col, 2 rows
                 */}
                <div className={styles.widget} style={{ gridColumn: 'span 1', gridRow: 'span 2' }}>
                    <div className={styles.widgetTitle}>
                        Critical Equipment
                        <ArrowUpRight size={16} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div className={styles.docItem}>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--accent-yellow)' }}>Main Valve V-14</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>High wear risk</div>
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>58%</div>
                        </div>
                        <div className={styles.docItem}>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#ffd700' }}>Compressor C-08</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Temp above normal</div>
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>71%</div>
                        </div>
                        <div className={styles.docItem}>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--primary-accent)' }}>Pump P-23</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Optimal</div>
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>92%</div>
                        </div>
                        <div className={styles.docItem}>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--primary-accent)' }}>Turbine T-01</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Running</div>
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>98%</div>
                        </div>
                    </div>
                </div>

                {/* 4. Active Wells (Small Stats) */}
                <div className={styles.widget} style={{ gridColumn: 'span 1' }}>
                    <div className={styles.widgetTitle}>Active Wells</div>
                    <div className={styles.statValue}>32/36</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>4 wells under maintenance</div>
                </div>


                {/* 5. Production Trend (Bottom Wide) - Spans 2 Cols (next to Health) */}
                <div className={styles.widget} style={{ gridColumn: 'span 2' }}>
                    <div className={styles.widgetTitle}>
                        Production Trend
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Updated 3 min ago</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div className={styles.statValue} style={{ fontSize: '2rem' }}>32,500</div>
                        <div style={{ fontSize: '0.8rem', display: 'flex', gap: '1rem' }}>
                            <span style={{ color: 'var(--primary-accent)' }}>● Oil</span>
                            <span style={{ color: 'rgba(255,255,255,0.3)' }}>● Gas</span>
                        </div>
                    </div>

                    <div className={styles.barContainer}>
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className={styles.bar} style={{
                                height: `${30 + Math.random() * 70}%`,
                                animationDelay: `${i * 0.05}s`
                            }} />
                        ))}
                    </div>
                </div>

                {/* 6. Map Widget (Bottom Left) */}
                <div className={styles.widget} style={{ gridColumn: 'span 1', padding: 0 }}>
                    <div style={{
                        width: '100%', height: '100%',
                        background: 'radial-gradient(circle at center, #1a2a40 0%, #0a0f18 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative'
                    }}>
                        {/* Simulated Map Nodes */}
                        <div style={{ position: 'absolute', top: '30%', left: '40%', width: '10px', height: '10px', background: 'var(--primary-accent)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary-accent)' }} />
                        <div style={{ position: 'absolute', top: '50%', left: '60%', width: '8px', height: '8px', background: 'white', borderRadius: '50%', opacity: 0.5 }} />
                        <div style={{ position: 'absolute', top: '60%', left: '30%', width: '6px', height: '6px', background: 'white', borderRadius: '50%', opacity: 0.3 }} />
                        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }}>
                            <line x1="40%" y1="30%" x2="60%" y2="50%" stroke="var(--primary-accent)" />
                            <line x1="40%" y1="30%" x2="30%" y2="60%" stroke="white" />
                        </svg>
                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontSize: '0.8rem', fontWeight: 'bold' }}>Offshore Assets Map</div>
                    </div>
                </div>

            </div>
        </DashboardShell>
    );
}
