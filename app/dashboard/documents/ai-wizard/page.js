"use client";
import React, { useState, useEffect, useRef } from 'react';
import DashboardShell from '../../../../components/DashboardShell';
import styles from './ai-wizard.module.css';
import { Send, FileText, Download, Check, Bot, ScanLine, FileSearch, AlertTriangle, ShieldCheck, Upload, Sparkles } from 'lucide-react';

export default function AIWizard() {
    const [mode, setMode] = useState('analyze'); // 'analyze' or 'generate'

    // --- Analyze Mode State ---
    const [isDragging, setIsDragging] = useState(false);
    const [scanStatus, setScanStatus] = useState('idle'); // idle, scanning, complete
    const [scanProgress, setScanProgress] = useState(0);
    const [analysisResult, setAnalysisResult] = useState(null);

    // --- Generate Mode State ---
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! I am Manthan AI. I can generate trade documents for you. What do you need today?' }
    ]);
    const [input, setInput] = useState('');
    const [docData, setDocData] = useState({
        type: 'DRAFT INVOICE',
        exporter: 'Manthan Exports Pvt Ltd',
        items: []
    });

    const messagesEndRef = useRef(null);

    // --- Analyze Logic ---
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        startScanSimulation();
    };

    const startScanSimulation = () => {
        setScanStatus('scanning');
        setScanProgress(0);

        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setScanStatus('complete');
                    setAnalysisResult({
                        score: 85,
                        risks: [
                            { type: 'risk', msg: 'Missing Force Majeure clause' },
                            { type: 'risk', msg: 'Payment terms ambiguous (Line 14)' },
                        ],
                        safe: [
                            { type: 'safe', msg: 'Incoterms 2020 Validated (CIF)' },
                            { type: 'safe', msg: 'Two-factor authorized signatures found' },
                            { type: 'safe', msg: 'HS Code 610910 matches description' }
                        ]
                    });
                    return 100;
                }
                return prev + 2; // Speed of scan
            });
        }, 50);
    };

    // --- Generate Logic (Chat) ---
    const handleSend = () => {
        if (!input.trim()) return;
        const text = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text }]);

        // Simulate AI Response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', text: `I've updated the document based on "${text}". Review the preview on the right.` }]);
            // Mock update
            if (text.toLowerCase().includes('invoice')) setDocData(prev => ({ ...prev, type: 'COMMERCIAL INVOICE' }));
        }, 1000);
    };

    return (
        <DashboardShell>
            <div className={styles.container}>
                {/* Header & Toggle */}
                <div className={styles.header}>
                    <div className={styles.titleGroup}>
                        <h1>
                            <Bot color="var(--primary-accent)" fill="rgba(0, 242, 255, 0.2)" />
                            AI Document Intelligence
                        </h1>
                        <p>Analyze contracts or generate new shipping documents.</p>
                    </div>
                    <div className={styles.modeToggle}>
                        <button
                            className={`${styles.toggleBtn} ${mode === 'analyze' ? styles.activeMode : ''}`}
                            onClick={() => setMode('analyze')}
                        >
                            <ScanLine size={18} /> Deep Scan
                        </button>
                        <button
                            className={`${styles.toggleBtn} ${mode === 'generate' ? styles.activeMode : ''}`}
                            onClick={() => setMode('generate')}
                        >
                            <Sparkles size={18} /> Generator
                        </button>
                    </div>
                </div>

                {/* --- MODE: ANALYZE --- */}
                {mode === 'analyze' && (
                    <div className={styles.analyzeContainer}>
                        {/* Drop Zone */}
                        <div
                            className={styles.uploadZone}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            style={{
                                borderColor: isDragging ? 'var(--primary-accent)' : undefined,
                                background: isDragging ? 'rgba(0, 242, 255, 0.1)' : undefined
                            }}
                        >
                            {scanStatus === 'scanning' && (
                                <>
                                    <div className={styles.scanOverlay} />
                                    <div className={styles.scanningUI}>
                                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-accent)', marginBottom: '1rem', fontFamily: 'monospace' }}>
                                            {scanProgress}%
                                        </div>
                                        <h3 className="animate-pulse">Scanning Document...</h3>
                                        <div className={styles.progressContainer}>
                                            <div className={styles.progressBar} style={{ width: `${scanProgress}%` }} />
                                        </div>
                                        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Extracting clauses & detecting risks</p>
                                    </div>
                                </>
                            )}

                            {scanStatus === 'idle' && (
                                <>
                                    <div className={styles.uploadIconWrapper}>
                                        <Upload size={32} color="var(--primary-accent)" />
                                    </div>
                                    <h3 className={styles.uploadTitle}>Drag & Drop Document</h3>
                                    <p className={styles.uploadSub}>Supports PDF, DOCX, JPG (OCR enabled)</p>
                                    <button className="btn btn-primary" onClick={startScanSimulation}>or Browse Files</button>
                                </>
                            )}

                            {scanStatus === 'complete' && (
                                <div style={{ textAlign: 'center', zIndex: 2 }}>
                                    <div className={styles.uploadIconWrapper} style={{ background: 'rgba(0, 242, 255, 0.1)', borderColor: 'var(--primary-accent)' }}>
                                        <ShieldCheck size={40} color="var(--primary-accent)" />
                                    </div>
                                    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Scan Complete</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Analyzed 'Sales_Contract_v4.pdf'</p>
                                    <button className="btn btn-outline" onClick={() => { setScanStatus('idle'); setAnalysisResult(null); }}>Scan Another</button>
                                </div>
                            )}
                        </div>

                        {/* Result Panel */}
                        <div className={styles.resultsPanel}>
                            {analysisResult ? (
                                <>
                                    <div className={styles.scoreCard}>
                                        <div className={styles.scoreCircle}>
                                            {analysisResult.score}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '4px' }}>Compliance Score</div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>High Compliance</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className={styles.sectionHeader}>
                                            <AlertTriangle color="#ff4d4d" size={16} /> Detected Risks ({analysisResult.risks.length})
                                        </div>
                                        {analysisResult.risks.map((risk, i) => (
                                            <div key={i} className={styles.riskItem}>
                                                <span>{risk.msg}</span>
                                                <span style={{ fontSize: '0.75rem', color: '#ff4d4d', fontWeight: 'bold', background: 'rgba(255, 77, 77, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>HIGH</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <div className={styles.sectionHeader}>
                                            <Check color="var(--primary-accent)" size={16} /> Validated Clauses ({analysisResult.safe.length})
                                        </div>
                                        {analysisResult.safe.map((item, i) => (
                                            <div key={i} className={styles.safeItem}>
                                                <span>{item.msg}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className={styles.emptyState}>
                                    <FileSearch size={48} style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                                    <p>Waiting for document scan...</p>
                                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.5 }}>Upload a document to view insights</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* --- MODE: GENERATE --- */}
                {mode === 'generate' && (
                    <div className={styles.chatContainer}>
                        <div className={styles.chatBox}>
                            <div className={styles.chatHistory}>
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.botMsg}`}>
                                        {msg.text}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className={styles.inputArea}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                                    className={styles.chatInput}
                                    placeholder="Type instructions (e.g., 'Add force majeure clause')..."
                                />
                                <button className="btn btn-primary" onClick={handleSend}><Send size={20} /></button>
                            </div>
                        </div>

                        <div className={styles.previewBox}>
                            <h2 style={{ textAlign: 'center', textTransform: 'uppercase', marginBottom: '2rem', fontSize: '1.5rem' }}>{docData.type}</h2>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                <div>
                                    <strong>EXPORTER:</strong><br />
                                    {docData.exporter}<br />
                                    123 Business Park<br />
                                    Mumbai, India
                                </div>
                                <div>
                                    <strong>INVOICE NO:</strong> INV-2024-001<br />
                                    <strong>DATE:</strong> {new Date().toLocaleDateString()}
                                </div>
                            </div>

                            <p><strong>CONSIGNEE:</strong><br />[Pending Input]</p>

                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem', marginBottom: '2rem' }}>
                                <thead style={{ borderBottom: '2px solid #000' }}>
                                    <tr>
                                        <th style={{ textAlign: 'left', padding: '8px' }}>Description</th>
                                        <th style={{ textAlign: 'right', padding: '8px' }}>Qty</th>
                                        <th style={{ textAlign: 'right', padding: '8px' }}>Unit Price</th>
                                        <th style={{ textAlign: 'right', padding: '8px' }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '8px' }}>Cotton T-Shirts (Style #402)</td>
                                        <td style={{ textAlign: 'right', padding: '8px' }}>500</td>
                                        <td style={{ textAlign: 'right', padding: '8px' }}>$12.00</td>
                                        <td style={{ textAlign: 'right', padding: '8px' }}>$6,000.00</td>
                                    </tr>
                                </tbody>
                            </table>

                            <hr style={{ margin: '2rem 0', borderColor: '#eee' }} />
                            <p style={{ textAlign: 'center', color: '#888', fontSize: '0.8rem', fontStyle: 'italic' }}>[Document Preview Auto-Updates]</p>
                        </div>
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
