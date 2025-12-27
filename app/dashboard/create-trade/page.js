"use client";
import React, { useState } from 'react';
import DashboardShell from '../../../components/DashboardShell';
import styles from './create-trade.module.css';
import { PackagePlus, Upload, Save, Send, Users, CheckCircle } from 'lucide-react';
import { useGlobal } from '../../../context/GlobalContext';
import { useRouter } from 'next/navigation';

export default function CreateTrade() {
    const { addTrade } = useGlobal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        product: '',
        quantity: '',
        units: 'Units',
        price: '',
        origin: 'JNPT, Mumbai',
        destination: '',
        importerName: '',
        importerEmail: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const totalValue = (parseFloat(formData.quantity) || 0) * (parseFloat(formData.price) || 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Call Global Action
        addTrade({
            product: formData.product,
            quantity: `${formData.quantity} ${formData.units}`,
            value: totalValue,
            origin: formData.origin,
            destination: formData.destination,
            status: 'Pending',
            importer: formData.importerName || 'Unknown'
        });

        setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);

            // Redirect after showing success for a bit
            setTimeout(() => {
                router.push('/dashboard/trades');
            }, 2000);
        }, 1000);
    };

    return (
        <DashboardShell>
            <div className={`animate-fade-in ${styles.container}`}>
                <div className={styles.card}>
                    <h1 className={styles.title}>
                        <PackagePlus color="var(--primary-neon)" size={32} /> Create New Trade
                    </h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        Define your product details, set terms, and invite an importer to start a verified trade.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <h3 className={styles.sectionTitle}>1. Product Details</h3>
                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Product Name</label>
                                <input
                                    type="text"
                                    name="product"
                                    className={styles.input}
                                    placeholder="e.g. Organic Cotton T-Shirts"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>HS Code</label>
                                <input type="text" className={styles.input} placeholder="e.g. 610910" />
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Description</label>
                                <textarea className={styles.textarea} placeholder="Detailed specification of goods..."></textarea>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Quantity</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="number"
                                        name="quantity"
                                        className={styles.input}
                                        placeholder="0"
                                        required
                                        onChange={handleChange}
                                    />
                                    <select name="units" className={styles.input} style={{ width: '120px' }} onChange={handleChange}>
                                        <option>Units</option>
                                        <option>Tons</option>
                                        <option>Kg</option>
                                        <option>Bales</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Unit Price (INR)</label>
                                <input
                                    type="number"
                                    name="price"
                                    className={styles.input}
                                    placeholder="₹ 0.00"
                                    required
                                    onChange={handleChange}
                                />
                                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#4ade80' }}>
                                    Total Value: ₹ {totalValue.toLocaleString()}
                                </div>
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Product Images / Catalog</label>
                                <div className={styles.uploadBox}>
                                    <Upload size={24} color="var(--text-muted)" />
                                    <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        Click or Drag to upload product images
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className={styles.sectionTitle}>2. Terms & Destination</h3>
                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Port of Loading</label>
                                <input
                                    type="text"
                                    name="origin"
                                    className={styles.input}
                                    defaultValue="JNPT, Mumbai"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Destination Port</label>
                                <input
                                    type="text"
                                    name="destination"
                                    className={styles.input}
                                    placeholder="e.g. Jebel Ali, Dubai"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Incoterms</label>
                                <select className={styles.input}>
                                    <option>FOB (Free on Board)</option>
                                    <option>CIF (Cost, Insurance & Freight)</option>
                                    <option>EXW (Ex Works)</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Payment Terms</label>
                                <select className={styles.input}>
                                    <option>Escrow (Recommended)</option>
                                    <option>Letter of Credit (LC)</option>
                                    <option>Advance Payment</option>
                                </select>
                            </div>
                        </div>

                        <h3 className={styles.sectionTitle}>3. Counterparty Invitation</h3>
                        <div className={styles.grid}>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <div style={{ background: 'rgba(255, 215, 0, 0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Users color="#ffd700" size={20} />
                                    <span style={{ fontSize: '0.9rem', color: '#dedede' }}>Invite an importer to review this trade proposal. They will receive a secure link.</span>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Importer Name</label>
                                <input
                                    type="text"
                                    name="importerName"
                                    className={styles.input}
                                    placeholder="Global Traders Inc."
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Importer Email</label>
                                <input
                                    type="email"
                                    name="importerEmail"
                                    className={styles.input}
                                    placeholder="contact@importer.com"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.btnGroup}>
                            <button type="button" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Save size={18} /> Save Draft
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isLoading}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', opacity: isLoading ? 0.7 : 1 }}
                            >
                                <Send size={18} /> {isLoading ? 'Processing...' : 'Create & Invite'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Success Overlay */}
                {showSuccess && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 2000,
                        animation: 'fadeIn 0.3s ease-out'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div className="animate-float" style={{
                                width: '100px', height: '100px', borderRadius: '50%',
                                background: 'rgba(74, 222, 128, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                boxShadow: '0 0 30px rgba(74, 222, 128, 0.4)'
                            }}>
                                <CheckCircle size={50} color="#4ade80" />
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Trade Initiated!</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Invite sent to importer. Redirecting...</p>
                        </div>
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
