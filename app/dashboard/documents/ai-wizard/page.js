"use client";
import React, { useState, useEffect, useRef } from 'react';
import DashboardShell from '../../../../components/DashboardShell';
import { Send, FileText, Download, Check, Bot } from 'lucide-react';

export default function AIWizard() {
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! I am your AI Trade Assistant. I can help you generate shipping documents instantly.' },
        { role: 'bot', text: 'To start, please select the type of document you need.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [docData, setDocData] = useState({
        type: '',
        exporter: 'Manthan Exports Pvt Ltd, Mumbai, India',
        importer: '',
        invoiceNo: 'INV-0000',
        date: '',
        items: []
    });

    useEffect(() => {
        setDocData(prev => ({
            ...prev,
            invoiceNo: 'INV-' + Math.floor(Math.random() * 10000),
            date: new Date().toLocaleDateString()
        }));
    }, []);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const handleOptionClick = (option) => {
        const userMsg = { role: 'user', text: `I want to create a ${option}` };
        setMessages(prev => [...prev, userMsg]);
        setDocData(prev => ({ ...prev, type: option }));

        // Trigger AI response for the selection
        processMessage(`I want to create a ${option}`, { ...docData, type: option });
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const text = input;
        setInput('');

        setMessages(prev => [...prev, { role: 'user', text }]);
        processMessage(text, docData);
    };

    const processMessage = async (userText, currentData) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userText,
                    currentDocData: currentData
                })
            });

            const data = await response.json();

            if (data.Error) {
                throw new Error(data.Error);
            }

            let botText = data.text;

            // Check for Structured Data update
            const jsonMatch = botText.match(/\|\|JSON\|\|([\s\S]*?)\|\|JSON\|\|/);
            if (jsonMatch && jsonMatch[1]) {
                try {
                    const updates = JSON.parse(jsonMatch[1]);
                    setDocData(prev => ({
                        ...prev,
                        ...updates,
                        // Merging items if strictly array, or replacing? Let's just spread updates for now.
                        // If items exist in updates, we might want to append or replace. 
                        // For simplicity, let's assume AI sends full items list or we handle it smart.
                        items: updates.items ? [...prev.items, ...updates.items] : prev.items
                    }));
                    // Remove JSON from display text
                    botText = botText.replace(jsonMatch[0], '').trim();
                } catch (e) {
                    console.error("Failed to parse AI JSON updates", e);
                }
            }

            setMessages(prev => [...prev, { role: 'bot', text: botText }]);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I encountered an error connecting to the AI. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        const element = document.getElementById('doc-preview-container');
        if (!element) return;

        const opt = {
            margin: 10,
            filename: `${docData.type || 'Document'}_${docData.invoiceNo}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        try {
            const html2pdf = (await import('html2pdf.js')).default;
            html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error("PDF Generation failed:", error);
            alert("Failed to generate PDF. potentially missing html2pdf.js dependency.");
        }
    };

    return (
        <DashboardShell>
            <div style={{ display: 'flex', height: 'calc(100vh - 140px)', gap: '2rem' }}>

                {/* Left: AI Chat Interface */}
                <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                        <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bot color="var(--primary-neon)" /> AI Document Wizard
                        </h2>
                    </div>

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
                                    color: msg.role === 'user' ? 'var(--primary-neon)' : 'var(--text-main)'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Options for Step 0 */}
                        {/* Options for initial selection */}
                        {messages.length <= 2 && (
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                {['Commercial Invoice', 'Packing List', 'Certificate of Origin'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleOptionClick(opt)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: 'transparent',
                                            border: '1px solid var(--primary-neon)',
                                            color: 'var(--primary-neon)',
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your answer..."
                                style={{
                                    flex: 1,
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                            <button
                                onClick={handleSend}
                                className="btn btn-primary"
                                style={{ borderRadius: '8px', padding: '0 1.5rem' }}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Live Document Preview */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ color: 'var(--text-muted)' }}>Live Preview</h3>
                        <button
                            className="btn btn-outline"
                            onClick={handleDownload}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        >
                            <Download size={16} /> Download PDF
                        </button>
                    </div>

                    <div id="doc-preview-container" style={{
                        flex: 1,
                        background: 'white',
                        color: 'black',
                        padding: '3rem',
                        borderRadius: '4px',
                        boxShadow: '0 0 20px rgba(0,0,0,0.3)',
                        overflowY: 'auto',
                        fontFamily: 'Times New Roman, serif'
                    }}>
                        {/* Document Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '2px solid #000', paddingBottom: '1rem' }}>
                            <div>
                                <h1 style={{ margin: 0, textTransform: 'uppercase', fontSize: '2rem' }}>{docData.type || 'DOCUMENT PREVIEW'}</h1>
                                <div style={{ fontSize: '0.9rem', color: '#555', marginTop: '0.5rem' }}>Original</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 'bold' }}>MANTHAN EXPORTS</div>
                                <div>Mumbai, India</div>
                            </div>
                        </div>

                        {/* Document Details */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
                                <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Exporter</div>
                                <div style={{ fontWeight: 'bold' }}>{docData.exporter}</div>
                            </div>
                            <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
                                <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Consignee</div>
                                <div style={{ fontWeight: 'bold', color: docData.importer ? 'black' : '#ccc' }}>
                                    {docData.importer || '[Waiting for input...]'}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            <div>
                                <strong>Invoice No:</strong> {docData.invoiceNo}<br />
                                <strong>Date:</strong> {docData.date}
                            </div>
                            <div>
                                <strong>Port of Loading:</strong> JNPT, Mumbai<br />
                                <strong>Terms:</strong> CIF
                            </div>
                        </div>

                        {/* Items Table */}
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
                            <thead>
                                <tr style={{ background: '#eee' }}>
                                    <th style={{ border: '1px solid #000', padding: '0.5rem', textAlign: 'left' }}>Description</th>
                                    <th style={{ border: '1px solid #000', padding: '0.5rem', textAlign: 'right' }}>Quantity</th>
                                    <th style={{ border: '1px solid #000', padding: '0.5rem', textAlign: 'right' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {docData.items.length > 0 ? (
                                    docData.items.map((item, i) => (
                                        <tr key={i}>
                                            <td style={{ border: '1px solid #000', padding: '0.5rem' }}>{item.desc}</td>
                                            <td style={{ border: '1px solid #000', padding: '0.5rem', textAlign: 'right' }}>100 Units</td>
                                            <td style={{ border: '1px solid #000', padding: '0.5rem', textAlign: 'right' }}>{item.amount}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" style={{ border: '1px solid #000', padding: '2rem', textAlign: 'center', color: '#ccc' }}>
                                            No items added yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            {docData.items.length > 0 && (
                                <tfoot>
                                    <tr>
                                        <td colSpan="2" style={{ border: '1px solid #000', padding: '0.5rem', textAlign: 'right', fontWeight: 'bold' }}>Total</td>
                                        <td style={{ border: '1px solid #000', padding: '0.5rem', textAlign: 'right', fontWeight: 'bold' }}>$5,000.00</td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>

                        {/* Footer */}
                        <div style={{ marginTop: '4rem', fontSize: '0.8rem', textAlign: 'center', color: '#666' }}>
                            This is an electronically generated document authorized by Manthan Trade Platform.
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
