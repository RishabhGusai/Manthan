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
        }, 2500);
    };

    return (
        <DashboardShell>
            <div className={`animate-fade-in ${styles.container}`}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Financial Support</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Working capital solutions & credit health monitoring.</p>
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Available Credit Limit</div>
                        <div className={styles.statValue}>₹ 50,00,000</div>
                        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: 'auto', borderRadius: '2px' }}>
                            <div style={{ width: '70%', height: '100%', background: 'var(--primary-accent)', borderRadius: '2px', boxShadow: '0 0 10px var(--primary-accent)' }}></div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Outstanding Loans</div>
                        <div className={styles.statValue} style={{ color: '#ff4d4d' }}>₹ 12,40,000</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 'auto' }}>2 active loans</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Next EMI Due</div>
                        <div className={styles.statValue} style={{ fontSize: '1.8rem', color: 'white' }}>15th Jan</div>
                        <div style={{ fontSize: '0.85rem', color: '#fbbf24', marginTop: 'auto' }}>₹ 1,20,000 due in 8 days</div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Credit Health</h3>
                    <div className={styles.creditContainer}>
                        <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Simple svg ring simulation */}
                            <svg width="180" height="180" viewBox="0 0 180 180" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                                <circle cx="90" cy="90" r="80" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="none" />
                                <circle cx="90" cy="90" r="80" stroke="var(--primary-accent)" strokeWidth="10" fill="none" strokeDasharray="502" strokeDashoffset="100" strokeLinecap="round" />
                            </svg>
                            <div className={styles.creditScoreCircle}>
                                <span className={styles.scoreVal}>785</span>
                                <span className={styles.scoreLabel}>Excellent</span>
                            </div>
                        </div>
                        <div style={{ marginLeft: '3rem', maxWidth: '400px' }}>
                            <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '0.5rem' }}>You're in the top 10%!</h4>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Your strong credit score makes you eligible for preferential interest rates starting at <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>8.5% p.a</span>.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Available Lending Offers</h3>
                    <div className={styles.loanGrid}>
                        {/* Card 1 */}
                        <div className={styles.loanCard}>
                            <div className={styles.bankLogo}>
                                <Landmark color="#ffd700" size={20} /> HDFC Bank
                            </div>
                            <h4 className={styles.loanTitle}>Export Working Capital</h4>
                            <div className={styles.loanDetails}>
                                <div className={styles.detailRow}><span className={styles.detailLabel}>Interest Rate</span> <span className={styles.detailValue}>9.2% p.a</span></div>
                                <div className={styles.detailRow}><span className={styles.detailLabel}>Tenure</span> <span className={styles.detailValue}>12 Months</span></div>
                                <div className={styles.detailRow}><span className={styles.detailLabel}>Max Amount</span> <span className={styles.detailValue}>₹ 1 Cr</span></div>
                            </div>
                            <button className="btn btn-outline" style={{ width: '100%', marginTop: 'auto' }} onClick={() => handleApply('Export Working Capital - HDFC')}>Apply Now</button>
                        </div>

                        {/* Card 2 */}
                        <div className={styles.loanCard} style={{ borderColor: 'rgba(0, 242, 255, 0.4)', background: 'linear-gradient(145deg, rgba(0, 242, 255, 0.05), rgba(0,0,0,0))' }}>
                            <div className={styles.bankLogo}>
                                <Landmark color="var(--primary-accent)" size={20} /> SBI Global
                            </div>
                            <h4 className={styles.loanTitle}>Pre-Shipment Credit</h4>
                            <div className={styles.loanDetails}>
                                <div className={styles.detailRow}><span className={styles.detailLabel}>Interest Rate</span> <span className={styles.detailValue} style={{ color: 'var(--primary-accent)' }}>8.5% p.a</span></div>
                                <div className={styles.detailRow}><span className={styles.detailLabel}>Tenure</span> <span className={styles.detailValue}>6 Months</span></div>
                                <div className={styles.detailRow}><span className={styles.detailLabel}>Max Amount</span> <span className={styles.detailValue}>₹ 50 Lacs</span></div>
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }} onClick={() => handleApply('Pre-Shipment Credit - SBI')}>Apply Now</button>
                        </div>

                        {/* Card 3 */}
                        <div className={styles.loanCard}>
                            <div className={styles.bankLogo}>
                                <Landmark color="#ff4d4d" size={20} /> Axis Bank
                            </div>
                            <h4 className={styles.loanTitle}>Term Loan</h4>
                            <div className={styles.loanDetails}>
                                <div className={styles.detailRow}><span className={styles.detailLabel}>Interest Rate</span> <span className={styles.detailValue}>10.5% p.a</span></div>
                                <div className={styles.detailRow}><span className={styles.detailLabel}>Tenure</span> <span className={styles.detailValue}>3 Years</span></div>
                                <div className={styles.detailRow}><span className={styles.detailLabel}>Max Amount</span> <span className={styles.detailValue}>₹ 2 Cr</span></div>
                            </div>
                            <button className="btn btn-outline" style={{ width: '100%', marginTop: 'auto' }} onClick={() => handleApply('Term Loan - Axis')}>Apply Now</button>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Invoice Discounting</h3>
                    <div className={styles.loanCard} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h4 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>Get Instant Cash for Unpaid Invoices</h4>
                            <p style={{ color: 'var(--text-muted)' }}>
                                Convert your pending invoices into immediate working capital. We advance up to <span style={{ color: 'white', fontWeight: 'bold' }}>90%</span> of the invoice value within 24 hours.
                            </p>
                        </div>
                        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '1rem 2rem' }} onClick={() => handleApply('Invoice Discounting')}>
                            <FileCheck size={20} /> Upload Invoice
                        </button>
                    </div>
                </div>

                {/* Application Modal */}
                {showModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <div style={{ padding: '2rem' }}>
                                <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.6 }}>
                                    <X size={24} />
                                </button>

                                {!isSuccess ? (
                                    <>
                                        <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', color: 'white' }}>Confirm Application</h2>
                                        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
                                            Applying for: <strong style={{ color: 'var(--primary-accent)' }}>{selectedLoan}</strong>
                                        </p>

                                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Business Name</span>
                                                <strong style={{ color: 'white' }}>Rahul Exports</strong>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Credit Score</span>
                                                <strong style={{ color: 'var(--primary-accent)' }}>785 (Excellent)</strong>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Pre-Approved Limit</span>
                                                <strong style={{ color: 'white' }}>₹ 50,00,000</strong>
                                            </div>
                                        </div>

                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center', fontStyle: 'italic' }}>
                                            By clicking confirm, you agree to share your financial data with the lender for processing.
                                        </p>

                                        <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={confirmApplication}>
                                            Confirm & Send Application
                                        </button>
                                    </>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                                        <div style={{
                                            width: '80px', height: '80px', background: 'rgba(0, 242, 255, 0.1)',
                                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            margin: '0 auto 1.5rem', boxShadow: '0 0 20px rgba(0, 242, 255, 0.2)'
                                        }}>
                                            <CheckCircle size={40} color="var(--primary-accent)" />
                                        </div>
                                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'white' }}>Application Submitted!</h2>
                                        <p style={{ color: 'var(--text-muted)' }}>The lender has received your request and will contact you shortly.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
