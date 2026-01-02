"use client";
import React, { useState } from 'react';
import DashboardShell from '../../../components/DashboardShell';
import styles from './trades.module.css';
import { Ship, MapPin, ShieldCheck, Thermometer, Zap, ShoppingCart, Package } from 'lucide-react';
import { useGlobal } from '../../../context/GlobalContext';

export default function Trades() {
    const { trades } = useGlobal();
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'market'
    const [showTracking, setShowTracking] = useState(null); // Reference to shipment ID
    const [showInsurance, setShowInsurance] = useState(null); // Reference to shipment ID

    // Mock Marketplace Items
    const marketplaceItems = [
        { id: 1, name: 'Standard Container (20ft)', category: 'Logistics', price: '₹ 1,50,000', img: 'https://images.unsplash.com/photo-1494412574643-35d324698420?auto=format&fit=crop&w=500&q=60' },
        { id: 2, name: 'Refined Fuel (1000L)', category: 'Energy', price: '₹ 85,000', img: 'https://images.unsplash.com/photo-1549525281-229202394017?auto=format&fit=crop&w=500&q=60' },
        { id: 3, name: 'Raw Limestone (1 Ton)', category: 'Materials', price: '₹ 4,500', img: 'https://images.unsplash.com/photo-1599818816858-a55181747864?auto=format&fit=crop&w=500&q=60' },
        { id: 4, name: 'Cotton Bales (Premium)', category: 'Textiles', price: '₹ 25,000', img: 'https://images.unsplash.com/photo-1605658661601-3841e21703e5?auto=format&fit=crop&w=500&q=60' },
    ];

    return (
        <DashboardShell>
            <div className={styles.container}>
                <h1 style={{ marginBottom: '1.5rem' }}>My Trades & Logistics</h1>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'active' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('active')}
                    >
                        Active Shipments
                    </button>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'market' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('market')}
                    >
                        Marketplace (Buy)
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'active' ? (
                    <div>
                        {activeTab === 'active' && trades.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                <Package size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                                <p>No active shipments found. Create a trade to get started.</p>
                            </div>
                        )}
                        {trades.map(shipment => (
                            <div key={shipment.id} className="glass-card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{shipment.id}</div>
                                    <div style={{ color: 'var(--text-muted)' }}>{shipment.product} • {shipment.destination || shipment.dest}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.8rem', borderRadius: '20px',
                                        background: 'rgba(0, 242, 255, 0.1)', color: 'var(--primary-accent)', border: '1px solid rgba(0, 242, 255, 0.2)'
                                    }}>
                                        {shipment.status}
                                    </span>
                                    <button className="btn btn-outline" onClick={() => setShowTracking(shipment.id)}>
                                        <MapPin size={18} style={{ marginRight: '5px' }} /> Track
                                    </button>
                                    <button className="btn btn-outline" onClick={() => setShowInsurance(shipment.id)}>
                                        <ShieldCheck size={18} style={{ marginRight: '5px' }} /> Insurance
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.marketGrid}>
                        {marketplaceItems.map(item => (
                            <div key={item.id} className={styles.marketCard}>
                                <img src={item.img} alt={item.name} className={styles.cardImg} />
                                <div className={styles.cardBody}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--primary-accent)', textTransform: 'uppercase' }}>{item.category}</div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: '0.2rem 0' }}>{item.name}</div>
                                    <div className={styles.priceTag}>{item.price}</div>
                                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                                        <ShoppingCart size={16} style={{ marginRight: '5px' }} /> Buy Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tracking Modal */}
                {showTracking && (
                    <div className={styles.modalOverlay} onClick={() => setShowTracking(null)}>
                        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <h2>Live Tracking: {showTracking}</h2>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ width: '100%', height: '300px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                                    {/* Visual Map Fallback or Image */}
                                    <img src="/images/map_tracking.png" alt="Tracking Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.7)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--primary-neon)' }}>
                                        <div>Speed: 24 Knots</div>
                                        <div>Lat: 34.5° N</div>
                                        <div>Long: 135.2° E</div>
                                    </div>
                                </div>

                                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>IoT Sensor Data</h3>
                                <div className={styles.iotGrid}>
                                    <div className={styles.graphCard}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Thermometer color="#ff4d4d" /> Container Temperature</div>
                                        <div className={styles.graphBar}>
                                            <div className={styles.bar} style={{ height: '40%' }}></div>
                                            <div className={styles.bar} style={{ height: '60%' }}></div>
                                            <div className={styles.bar} style={{ height: '55%' }}></div>
                                            <div className={styles.bar} style={{ height: '45%' }}></div>
                                            <div className={styles.bar} style={{ height: '50%' }}></div>
                                        </div>
                                        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#aaa', marginTop: '5px' }}>Avg: 24°C</div>
                                    </div>
                                    <div className={styles.graphCard}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Zap color="#ffd700" /> Shock/Vibration</div>
                                        <div className={styles.graphBar}>
                                            <div className={styles.bar} style={{ height: '10%', background: '#ffd700' }}></div>
                                            <div className={styles.bar} style={{ height: '15%', background: '#ffd700' }}></div>
                                            <div className={styles.bar} style={{ height: '80%', background: '#ff4d4d' }}></div> {/* Spookt */}
                                            <div className={styles.bar} style={{ height: '12%', background: '#ffd700' }}></div>
                                            <div className={styles.bar} style={{ height: '10%', background: '#ffd700' }}></div>
                                        </div>
                                        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#aaa', marginTop: '5px' }}>Alert: High Impact Detected!</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Insurance Modal */}
                {showInsurance && (
                    <div className={styles.modalOverlay} onClick={() => setShowInsurance(null)}>
                        <div className={styles.modalContent} style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <h2>File Insurance Claim</h2>
                                <p style={{ color: 'var(--text-muted)' }}>Shipment: {showInsurance}</p>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <div className={styles.guidelines}>
                                    <strong><ShieldCheck size={16} style={{ display: 'inline' }} /> Claim Guidelines:</strong>
                                    <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                        <li>Claims must be filed within 48 hours of incident.</li>
                                        <li>Photos of damage are mandatory for processing.</li>
                                        <li>Standard deductible is ₹10,000 for standard containers.</li>
                                    </ul>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Incident Type</label>
                                    <select className={styles.formInput}>
                                        <option>Physical Damage to Cargo</option>
                                        <option>Container Loss</option>
                                        <option>Theft / Pilferage</option>
                                        <option>Temperature Excursion</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Date of Incident</label>
                                    <input type="date" className={styles.formInput} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Estimated Loss (₹)</label>
                                    <input type="number" placeholder="e.g. 50000" className={styles.formInput} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Description</label>
                                    <textarea rows="4" className={styles.formInput} placeholder="Describe what happened..."></textarea>
                                </div>

                                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { alert('Claim Filed Successfully!'); setShowInsurance(null); }}>
                                    Submit Claim
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
