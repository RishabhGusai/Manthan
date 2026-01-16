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
            <div className={`animate-fade-in ${styles.container}`}>
                {/* Page Header */}
                <div className={styles.header}>
                    <div>
                        <span className={styles.platformTag}>Platform A</span>
                        <h1 className={styles.title}>
                            Global Operations
                        </h1>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--primary-accent)', fontWeight: 'bold', fontSize: '1.2rem' }}>14:23 UTC</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Day Shift • Singapore</div>
                    </div>
                </div>

                <div className={styles.grid}>
                    {/* 1. Primary Recommendation (Large Left Card) - Spans 2 cols, 2 rows */}
                    <div className={`${styles.widget} ${styles.recommendationCard}`} style={{ gridColumn: 'span 1', gridRow: 'span 2', minHeight: '400px' }}>
                        <div className={styles.widgetTitle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ padding: '6px', background: 'var(--primary-accent)', borderRadius: '6px', display: 'flex' }}>
                                    <Zap size={16} color="black" fill="black" />
                                </div>
                                AI Operations Assistant
                            </div>
                            <Activity size={18} color="var(--primary-accent)" />
                        </div>

                        {/* Simulated 3D Graphic */}
                        <div style={{
                            flex: 1,
                            background: 'url(/images/tech_schematic_pump.png) center/contain no-repeat',
                            filter: 'drop-shadow(0 0 20px rgba(0, 242, 255, 0.3)) saturate(200%)',
                            mixBlendMode: 'screen',
                            opacity: 0.9,
                            margin: '1.5rem 0'
                        }} />

                        <div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>
                                Optimization Opportunity
                            </div>
                            <p style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: '1.6' }}>
                                Reschedule non-critical maintenance on <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>Pump P-23</span> to 02:00-04:00.
                                <br />
                                Est. impact: <span style={{ color: '#4ade80', fontWeight: 'bold' }}>+2.7% Output Stability</span>.
                            </p>
                        </div>
                    </div>

                    {/* 2. Live Stats */}
                    <div className={styles.widget} style={{ gridColumn: 'span 1' }}>
                        <div className={styles.widgetTitle}>
                            Oil Production
                            <TrendingUp size={16} color="var(--primary-accent)" />
                        </div>
                        <div className={styles.statValue}>
                            89,200 <span className={styles.statUnit}>bbl</span>
                        </div>

                        {/* Sparkline Simulation */}
                        <div style={{ height: '50px', width: '100%', position: 'relative' }}>
                            <svg viewBox="0 0 100 25" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: 'var(--primary-accent)', stopOpacity: 0.3 }} />
                                        <stop offset="100%" style={{ stopColor: 'var(--primary-accent)', stopOpacity: 0 }} />
                                    </linearGradient>
                                </defs>
                                <path d="M0,20 Q10,5 25,12 T50,18 T75,5 T100,15 V25 H0 Z" fill="url(#grad1)" />
                                <path d="M0,20 Q10,5 25,12 T50,18 T75,5 T100,15" fill="none" stroke="var(--primary-accent)" strokeWidth="2" className={styles.sparkline} />
                            </svg>
                        </div>

                        <div style={{ color: 'var(--primary-accent)', fontSize: '0.85rem', marginTop: 'auto', fontWeight: '600' }}>+4.2% vs target</div>
                    </div>

                    <div className={styles.widget} style={{ gridColumn: 'span 1' }}>
                        <div className={styles.widgetTitle}>
                            Gas Output
                            <Activity size={16} color="var(--accent-yellow)" />
                        </div>
                        <div className={styles.statValue}>
                            12.4 <span className={styles.statUnit}>MMSCF</span>
                        </div>
                        <div style={{ height: '50px', width: '100%', position: 'relative' }}>
                            <svg viewBox="0 0 100 25" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                                <path d="M0,15 Q15,20 30,10 T60,5 T90,20 T100,10" fill="none" stroke="var(--accent-yellow)" strokeWidth="2" className={styles.sparkline} style={{ color: 'var(--accent-yellow)' }} />
                            </svg>
                        </div>
                        <div style={{ color: 'var(--accent-yellow)', fontSize: '0.85rem', marginTop: 'auto', fontWeight: '600' }}>-1.1% deviation</div>
                    </div>

                    <div className={styles.widget} style={{ gridColumn: 'span 1' }}>
                        <div className={styles.widgetTitle}>Sys. Uptime (24h)</div>
                        <div className={styles.statValue}>99.8%</div>
                        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1rem' }}>
                            <div style={{ width: '99.8%', height: '100%', background: 'var(--neon-lime)', borderRadius: '3px', boxShadow: '0 0 10px var(--neon-lime)' }} />
                        </div>
                    </div>


                    {/* 3. Critical Equipment Health (Right Middle List) */}
                    <div className={styles.widget} style={{ gridColumn: 'span 1', gridRow: 'span 2' }}>
                        <div className={styles.widgetTitle}>
                            Critical Equipment
                            <ArrowUpRight size={16} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {[
                                { name: 'Main Valve V-14', status: 'High Wear', health: 58, color: 'var(--accent-yellow)' },
                                { name: 'Compressor C-08', status: 'Temp Warning', health: 71, color: '#f59e0b' },
                                { name: 'Pump P-23', status: 'Optimal', health: 92, color: 'var(--primary-accent)' },
                                { name: 'Turbine T-01', status: 'Optimal', health: 98, color: 'var(--primary-accent)' }
                            ].map((item, i) => (
                                <div key={i} className={styles.listItem}>
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: item.color, marginBottom: '2px' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.status}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'Outfit' }}>{item.health}%</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Active Wells (Small Stats) */}
                    <div className={styles.widget} style={{ gridColumn: 'span 1' }}>
                        <div className={styles.widgetTitle}>Active Wells</div>
                        <div className={styles.statValue}>
                            32<span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>/36</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>4 wells under maintenance cycle</div>
                    </div>


                    {/* 5. Production Trend (Bottom Wide) */}
                    <div className={styles.widget} style={{ gridColumn: 'span 2' }}>
                        <div className={styles.widgetTitle}>
                            Production Trend
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Live Telemetry</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div className={styles.statValue} style={{ fontSize: '2rem', marginBottom: 0 }}>32,500</div>
                            <div style={{ fontSize: '0.8rem', display: 'flex', gap: '1rem' }}>
                                <span style={{ color: 'var(--primary-accent)', display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 8, height: 8, background: 'var(--primary-accent)', borderRadius: '50%' }}></div> Oil</span>
                                <span style={{ color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 8, height: 8, background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }}></div> Gas</span>
                            </div>
                        </div>

                        <div className={styles.barContainer}>
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className={styles.bar} style={{
                                    height: `${30 + Math.random() * 60}%`,
                                    animationDelay: `${i * 0.03}s`
                                }} />
                            ))}
                        </div>
                    </div>

                    {/* 6. Map Widget (Bottom Left) */}
                    <div className={styles.widget} style={{ gridColumn: 'span 1', padding: 0, border: 'none', background: 'transparent' }}>
                        <div className={styles.mapContainer}>
                            {/* Simulated Map Nodes */}
                            <div style={{ position: 'absolute', top: '30%', left: '40%', width: '12px', height: '12px', background: 'var(--primary-accent)', borderRadius: '50%', boxShadow: '0 0 15px var(--primary-accent)', zIndex: 2 }} />
                            <div style={{ position: 'absolute', top: '30%', left: '40%', width: '40px', height: '40px', border: '1px solid var(--primary-accent)', borderRadius: '50%', opacity: 0.3, animation: 'ping 2s infinite' }} />

                            <div style={{ position: 'absolute', top: '50%', left: '60%', width: '8px', height: '8px', background: 'white', borderRadius: '50%', opacity: 0.8 }} />
                            <div style={{ position: 'absolute', top: '65%', left: '25%', width: '6px', height: '6px', background: '#f59e0b', borderRadius: '50%', opacity: 0.9, boxShadow: '0 0 10px #f59e0b' }} />

                            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4, pointerEvents: 'none' }}>
                                <line x1="40%" y1="30%" x2="60%" y2="50%" stroke="var(--primary-accent)" strokeDasharray="4" />
                                <line x1="40%" y1="30%" x2="25%" y2="65%" stroke="white" strokeDasharray="4" />
                            </svg>
                            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.4rem 0.8rem', borderRadius: '8px', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>OFFSHORE ASSETS</div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--primary-accent)' }}>Sector 7G active</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardShell>
    );
}
