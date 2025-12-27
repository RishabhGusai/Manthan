"use client";
import React, { useState } from 'react';
import DashboardShell from '../../../components/DashboardShell';
import styles from './finance.module.css';
import { Landmark, FileCheck, X, CheckCircle } from 'lucide-react';

export default function Finance() {
    const [showModal, setShowModal] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleApply = (loanName) => {
        setSelectedLoan(loanName);
        setShowModal(true);
        setIsSuccess(false);
    };

    const confirmApplication = () => {
        // Simulate API call
        setIsSuccess(true);
        setTimeout(() => {
            setShowModal(false);
            setIsSuccess(false);
        }, 2000);
    };

    return (
        <DashboardShell>
            <div className={`animate-fade-in ${styles.container}`}>
                <div className={styles.header}>
                    <h1>Financial Support & Loans</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Get working capital, invoice discounting, and check your business credit score.</p>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Available Credit Limit</div>
                        <div className={styles.statValue}>₹ 50,00,000</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Outstanding Loans</div>
                        <div className={styles.statValue} style={{ color: '#ff4d4d' }}>₹ 12,40,000</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Next EMI Date</div>
                        <div className={styles.statValue} style={{ fontSize: '1.4rem', color: 'white' }}>15th Jan 2026</div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Your Credit Score</h3>
                    <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                        <div className={styles.creditScoreCircle}>
                            <span className={styles.scoreVal}>785</span>
                            <span className={styles.scoreLabel}>Excellent</span>
                        </div>
                        <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                            Your strong credit score makes you eligible for lower interest rates (starting 8.5% p.a).
                        </p>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Loan Offers & Working Capital</h3>
                    <div className={styles.loanGrid}>
                        <div className={styles.loanCard}>
                            <div className={styles.bankLogo}>
                                <Landmark color="#ffd700" /> HDFC Bank
                            </div>
                            <h4>Export Working Capital</h4>
                            <div className={styles.loanDetails}>
                                <div className={styles.detailRow}><span>Interest Rate:</span> <span style={{ color: 'white' }}>9.2% p.a</span></div>
                                <div className={styles.detailRow}><span>Tenure:</span> <span style={{ color: 'white' }}>12 Months</span></div>
                                <div className={styles.detailRow}><span>Max Amount:</span> <span style={{ color: 'white' }}>₹ 1 Cr</span></div>
                            </div>
                            <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => handleApply('Export Working Capital - HDFC')}>Apply Now</button>
                        </div>

                        <div className={styles.loanCard}>
                            <div className={styles.bankLogo}>
                                <Landmark color="#00f2ff" /> SBI Global
                            </div>
                            <h4>Pre-Shipment Credit</h4>
                            <div className={styles.loanDetails}>
                                <div className={styles.detailRow}><span>Interest Rate:</span> <span style={{ color: 'white' }}>8.5% p.a</span></div>
                                <div className={styles.detailRow}><span>Tenure:</span> <span style={{ color: 'white' }}>6 Months</span></div>
                                <div className={styles.detailRow}><span>Max Amount:</span> <span style={{ color: 'white' }}>₹ 50 Lacs</span></div>
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleApply('Pre-Shipment Credit - SBI')}>Apply Now</button>
                        </div>

                        <div className={styles.loanCard}>
                            <div className={styles.bankLogo}>
                                <Landmark color="#ff4d4d" /> Axis Bank
                            </div>
                            <h4>Term Loan</h4>
                            <div className={styles.loanDetails}>
                                <div className={styles.detailRow}><span>Interest Rate:</span> <span style={{ color: 'white' }}>10.5% p.a</span></div>
                                <div className={styles.detailRow}><span>Tenure:</span> <span style={{ color: 'white' }}>3 Years</span></div>
                                <div className={styles.detailRow}><span>Max Amount:</span> <span style={{ color: 'white' }}>₹ 2 Cr</span></div>
                            </div>
                            <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => handleApply('Term Loan - Axis')}>Apply Now</button>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Invoice Discounting</h3>
                    <div className={styles.loanCard} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h4>Get Instant Cash for Unpaid Invoices</h4>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '500px' }}>
                                Convert your pending invoices into immediate working capital. We advance up to 90% of the invoice value.
                            </p>
                        </div>
                        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => handleApply('Invoice Discounting')}>
                            <FileCheck size={18} /> Upload Invoice
                        </button>
                    </div>
                </div>

                {/* Application Modal */}
                {showModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 1000
                    }}>
                        <div className="glass-card" style={{ maxWidth: '500px', width: '90%', position: 'relative' }}>
                            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>

                            {!isSuccess ? (
                                <>
                                    <h2 style={{ marginBottom: '1rem' }}>Application Review</h2>
                                    <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                                        You are applying for: <strong style={{ color: 'white' }}>{selectedLoan}</strong>
                                    </p>

                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span>Business Name:</span>
                                            <strong>Rahul Exports</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span>Credit Score:</span>
                                            <strong style={{ color: '#4ade80' }}>785 (Excellent)</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Pre-Approved Limit:</span>
                                            <strong>₹ 50,00,000</strong>
                                        </div>
                                    </div>

                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                        By clicking confirm, you agree to share your financial data with the lender for processing.
                                    </p>

                                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={confirmApplication}>
                                        Confirm & Send Application
                                    </button>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <CheckCircle size={64} color="#4ade80" style={{ marginBottom: '1rem' }} />
                                    <h2>Application Submitted!</h2>
                                    <p style={{ color: 'var(--text-muted)' }}>The lender will contact you shortly.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
