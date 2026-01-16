"use client";
import { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X, Bot } from 'lucide-react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! I am Manthan AI. How can I help you with your trade today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Initialize Gemini (Client-Side for Static Deployment)
    // NOTE: In a real production app, use a proxy or server to hide the key.
    // Since this is a demo/hackathon project hosted on GitHub Pages, we use it directly.
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI("AIzaSyBLjLJG9tuACWBAqK7tQehRt1RnjzCVSeo");

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        try {
            // Direct Client-Side Call
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{
                            text: `You are Manthan AI, an intelligent assistant for the "Manthan" Export-Import platform.
                            Keep answers concise (max 3 sentences).`
                        }]
                    },
                    {
                        role: "model",
                        parts: [{ text: "Hello! I am Manthan AI. How can I assist with your shipments or documentation today?" }]
                    }
                ]
            });

            const result = await chat.sendMessage(userMsg);
            const response = await result.response;
            const text = response.text();

            setMessages(prev => [...prev, { role: 'bot', text: text }]);

        } catch (error) {
            console.error("Gemini Error:", error);
            setMessages(prev => [...prev, { role: 'bot', text: "Connection error. Please try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
            {/* Chat Window */}
            {isOpen && (
                <div className="glass-card" style={{
                    width: '350px',
                    height: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '1rem',
                    padding: 0,
                    overflow: 'hidden',
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '1rem',
                        background: 'linear-gradient(to right, var(--secondary-neon), var(--primary-neon))',
                        color: '#000',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bot size={20} /> Manthan AI
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={20} color="#000" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                background: msg.role === 'user' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(255,255,255,0.1)',
                                padding: '0.8rem',
                                borderRadius: '12px',
                                maxWidth: '80%',
                                fontSize: '0.9rem',
                                border: msg.role === 'user' ? '1px solid var(--primary-neon)' : '1px solid rgba(255,255,255,0.1)'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div style={{
                                alignSelf: 'flex-start',
                                background: 'rgba(255,255,255,0.1)',
                                padding: '0.8rem',
                                borderRadius: '12px',
                                maxWidth: '80%',
                                fontSize: '0.9rem',
                                fontStyle: 'italic',
                                color: 'var(--text-muted)'
                            }}>
                                Manthan is thinking...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about shipments, docs..."
                                style={{
                                    flex: 1,
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '8px',
                                    padding: '0.5rem',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    background: 'var(--primary-neon)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.5rem',
                                    cursor: 'pointer',
                                    color: '#000'
                                }}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px', height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--secondary-neon), var(--primary-neon))',
                    border: 'none',
                    boxShadow: '0 0 20px rgba(0, 242, 255, 0.5)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isOpen ? <X size={30} color="#000" /> : <MessageSquare size={30} color="#000" />}
            </button>
        </div>
    );
}
