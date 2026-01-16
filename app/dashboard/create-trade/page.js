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
                        <PackagePlus color="var(--primary-accent)" size={32} /> Create New Trade
                    </h1>
                    <p className={styles.subtitle}>
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
                                <textarea className={styles.textarea} placeholder="Detailed specification of goods, quality standards, and packaging details..."></textarea>
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
                                <div style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: 'var(--primary-accent)', fontWeight: 'bold' }}>
                                    Target Value: ₹ {totalValue.toLocaleString()}
                                </div>
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Product Documentation / Catalog</label>
                                <div className={styles.uploadBox}>
                                    <Upload size={32} color="var(--primary-accent)" style={{ opacity: 0.8 }} />
                                    <div style={{ fontSize: '1rem', color: 'white' }}>
                                        Drag & Drop files here or click to browse
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        Supports PDF, JPG, PNG (Max 10MB)
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
                                <div className={styles.infoBox}>
                                    <Users color="#ffd700" size={24} style={{ marginTop: '3px' }} />
                                    <div>
                                        <strong style={{ color: '#ffd700', display: 'block', marginBottom: '4px' }}>Secure Invite Link</strong>
                                        <span style={{ fontSize: '0.9rem', color: '#dedede', lineHeight: '1.4' }}>
                                            An invite will be sent to the importer to review and digitally sign this trade proposal.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Importer Company Name</label>
                                <input
                                    type="text"
                                    name="importerName"
                                    className={styles.input}
                                    placeholder="Global Traders Inc."
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Importer Email Address</label>
                                <input
                                    type="email"
                                    name="importerEmail"
                                    className={styles.input}
                                    placeholder="procurement@partner.com"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.btnGroup}>
                            <button type="button" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.5rem' }}>
                                <Save size={18} /> Save as Draft
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isLoading}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isLoading ? 0.7 : 1, padding: '0.8rem 2rem' }}
                            >
                                <Send size={18} /> {isLoading ? 'Processing...' : 'Create Trade & Invite'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Success Overlay */}
                {showSuccess && (
                    <div className={styles.successOverlay}>
                        <div className={styles.successCard}>
                            <div className={styles.successIcon}>
                                <CheckCircle size={60} color="var(--primary-accent)" />
                            </div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Trade Initiated!</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                Your trade proposal has been created and the invite has been sent.
                                <br />Redirecting to your Active Trades...
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
