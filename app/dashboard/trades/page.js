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
                <h1 style={{ marginBottom: '1.5rem', fontWeight: 600, fontSize: '1.8rem' }}>My Trades & Logistics</h1>

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
                        {activeTab === 'active' && trades.length === 0 ? (
                            <div className={styles.emptyState}>
                                <Package size={64} style={{ opacity: 0.3, marginBottom: '1.5rem', color: 'var(--primary-accent)' }} />
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Active Shipments</h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)' }}>Create a new trade or visit the marketplace to get started.</p>
                            </div>
                        ) : (
                            trades.map(shipment => (
                                <div key={shipment.id} className={styles.shipmentCard}>
                                    <div>
                                        <div className={styles.shipmentId}>{shipment.id}</div>
                                        <div className={styles.shipmentMeta}>
                                            <span style={{ color: 'var(--primary-accent)' }}>{shipment.product}</span>
                                            <span>•</span>
                                            <span>{shipment.destination || shipment.dest}</span>
                                        </div>
                                    </div>
                                    <div className={styles.actionsGroup}>
                                        <span className={styles.statusPill}>
                                            {shipment.status}
                                        </span>
                                        <button className="btn btn-outline" onClick={() => setShowTracking(shipment.id)}>
                                            <MapPin size={18} style={{ marginRight: '8px' }} /> Track
                                        </button>
                                        <button className="btn btn-outline" onClick={() => setShowInsurance(shipment.id)}>
                                            <ShieldCheck size={18} style={{ marginRight: '8px' }} /> Insurance
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className={styles.marketGrid}>
                        {marketplaceItems.map(item => (
                            <div key={item.id} className={styles.marketCard}>
                                <img src={item.img} alt={item.name} className={styles.cardImg} />
                                <div className={styles.cardBody}>
                                    <span className={styles.categoryTag}>{item.category}</span>
                                    <div className={styles.itemName}>{item.name}</div>
                                    <div className={styles.priceTag}>{item.price}</div>
                                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                        <ShoppingCart size={18} /> Buy Now
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
                            <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem' }}>Live Tracking</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '5px' }}>Shipment ID: {showTracking}</p>
                                </div>
                                <div className={styles.statusPill}>In Transit</div>
                            </div>

                            <div style={{ padding: '2rem' }}>
                                <div className={styles.trackingMapContainer}>
                                    {/* Visual Map Fallback or Image */}
                                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80" alt="Tracking Map" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(60%) contrast(1.2)' }} />
                                    <div className={styles.telemetryOverlay}>
                                        <div>SPEED: 24 KNOTS</div>
                                        <div>LAT: 34.5403° N</div>
                                        <div>LNG: 135.2104° E</div>
                                        <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', opacity: 0.7 }}>UPDATED: 2 MINS AGO</div>
                                    </div>
                                </div>

                                <h3 style={{ marginTop: '2.5rem', marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Zap size={20} color="var(--primary-accent)" /> IoT Sensor Data
                                </h3>

                                <div className={styles.iotGrid}>
                                    <div className={styles.graphCard}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            <Thermometer size={18} color="#ff4d4d" /> Container Temperature
                                        </div>
                                        <div className={styles.graphBar}>
                                            <div className={styles.bar} style={{ height: '40%' }}></div>
                                            <div className={styles.bar} style={{ height: '60%' }}></div>
                                            <div className={styles.bar} style={{ height: '55%' }}></div>
                                            <div className={styles.bar} style={{ height: '45%' }}></div>
                                            <div className={styles.bar} style={{ height: '50%' }}></div>
                                            <div className={styles.bar} style={{ height: '48%' }}></div>
                                            <div className={styles.bar} style={{ height: '52%' }}></div>
                                        </div>
                                        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '10px' }}>Avg: 24°C</div>
                                    </div>
                                    <div className={styles.graphCard}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            <Zap size={18} color="#ffd700" /> Shock/Vibration
                                        </div>
                                        <div className={styles.graphBar}>
                                            <div className={styles.bar} style={{ height: '10%', background: '#ffd700', boxShadow: 'none' }}></div>
                                            <div className={styles.bar} style={{ height: '15%', background: '#ffd700', boxShadow: 'none' }}></div>
                                            <div className={styles.bar} style={{ height: '80%', background: '#ff4d4d', boxShadow: '0 0 10px #ff4d4d' }}></div>
                                            <div className={styles.bar} style={{ height: '12%', background: '#ffd700', boxShadow: 'none' }}></div>
                                            <div className={styles.bar} style={{ height: '10%', background: '#ffd700', boxShadow: 'none' }}></div>
                                            <div className={styles.bar} style={{ height: '8%', background: '#ffd700', boxShadow: 'none' }}></div>
                                            <div className={styles.bar} style={{ height: '5%', background: '#ffd700', boxShadow: 'none' }}></div>
                                        </div>
                                        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#ff4d4d', marginTop: '10px', fontWeight: 'bold' }}>Alert: High Impact Detected!</div>
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
                            <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <h2 style={{ fontSize: '1.5rem' }}>File Insurance Claim</h2>
                                <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '5px' }}>Shipment: {showInsurance}</p>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <div className={styles.guidelines}>
                                    <strong style={{ color: '#ffd700', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <ShieldCheck size={18} /> CLAIM GUIDELINES
                                    </strong>
                                    <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
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
                                    <textarea rows="4" className={styles.formInput} placeholder="Describe what happened detailedly..."></textarea>
                                </div>

                                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }} onClick={() => { alert('Claim Filed Successfully!'); setShowInsurance(null); }}>
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
