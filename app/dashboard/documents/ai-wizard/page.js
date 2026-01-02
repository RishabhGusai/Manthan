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
                    <div>
                        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Bot color="var(--primary-accent)" /> AI Document Intelligence
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Analyze contracts or generate new shipping documents.</p>
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
                            {scanStatus === 'scanning' && <div className={styles.scanOverlay} />}

                            {scanStatus === 'idle' && (
                                <>
                                    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', marginBottom: '1.5rem' }}>
                                        <Upload size={40} color="var(--primary-accent)" />
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Drag & Drop Document</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Supports PDF, DOCX, JPG (OCR enabled)</p>
                                    <button className="btn btn-primary" onClick={startScanSimulation}>or Browse Files</button>
                                </>
                            )}

                            {scanStatus === 'scanning' && (
                                <div style={{ textAlign: 'center', width: '100%' }}>
                                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-accent)', marginBottom: '1rem', fontFamily: 'monospace' }}>
                                        {scanProgress}%
                                    </div>
                                    <h3 className="animate-pulse">Scanning Document...</h3>
                                    <div style={{ width: '60%', height: '4px', background: 'rgba(255,255,255,0.1)', margin: '1rem auto', borderRadius: '2px' }}>
                                        <div style={{ width: `${scanProgress}%`, height: '100%', background: 'var(--primary-accent)', borderRadius: '2px' }} />
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)' }}>Extracting clauses & detecting risks</p>
                                </div>
                            )}

                            {scanStatus === 'complete' && (
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ padding: '1.5rem', background: 'rgba(0, 242, 255, 0.1)', borderRadius: '50%', marginBottom: '1.5rem', display: 'inline-flex' }}>
                                        <ShieldCheck size={50} color="var(--primary-accent)" />
                                    </div>
                                    <h2>Scan Complete</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Analyzed 'Sales_Contract_v4.pdf'</p>
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
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Compliance Score</div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>High Compliance</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <AlertTriangle color="#ff4d4d" size={18} /> Detected Risks ({analysisResult.risks.length})
                                        </h4>
                                        {analysisResult.risks.map((risk, i) => (
                                            <div key={i} className={styles.riskItem}>
                                                <span>{risk.msg}</span>
                                                <span style={{ fontSize: '0.8rem', color: '#ff4d4d', fontWeight: 'bold' }}>HIGH</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ marginTop: '1rem' }}>
                                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Check color="var(--primary-accent)" size={18} /> Validated Clauses ({analysisResult.safe.length})
                                        </h4>
                                        {analysisResult.safe.map((item, i) => (
                                            <div key={i} className={styles.safeItem}>
                                                <span>{item.msg}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                                    <FileSearch size={64} style={{ marginBottom: '1rem' }} />
                                    <p>Waiting for document scan...</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* --- MODE: GENERATE --- */}
                {mode === 'generate' && (
                    <div className={styles.chatContainer}>
                        <div className={styles.chatBox}>
                            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {messages.map((msg, idx) => (
                                    <div key={idx} style={{
                                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '80%'
                                    }}>
                                        <div style={{
                                            background: msg.role === 'user' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(255,255,255,0.05)',
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            border: msg.role === 'user' ? '1px solid rgba(0, 242, 255, 0.3)' : '1px solid rgba(255,255,255,0.1)',
                                            color: msg.role === 'user' ? 'var(--primary-accent)' : 'var(--text-main)'
                                        }}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                                        className={styles.input}
                                        placeholder="Type instructions (e.g., 'Add force majeure clause')..."
                                        style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                                    />
                                    <button className="btn btn-primary" onClick={handleSend}><Send size={20} /></button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.previewBox}>
                            <h2 style={{ textAlign: 'center', textTransform: 'uppercase', marginBottom: '2rem' }}>{docData.type}</h2>
                            <p><strong>Exporter:</strong> {docData.exporter}</p>
                            <p><strong>Consignee:</strong> [Pending Input]</p>
                            <hr style={{ margin: '2rem 0' }} />
                            <p style={{ textAlign: 'center', color: '#888' }}>[Document Preview Auto-Updates]</p>
                        </div>
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
