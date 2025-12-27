"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock login delay
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, #1a233a 0%, #0a0e17 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Effects */}
            <div style={{
                position: 'absolute', top: '-10%', right: '-10%',
                width: '500px', height: '500px',
                background: 'rgba(0, 242, 255, 0.1)',
                filter: 'blur(100px)', borderRadius: '50%'
            }} />
            <div style={{
                position: 'absolute', bottom: '-10%', left: '-10%',
                width: '500px', height: '500px',
                background: 'rgba(112, 0, 255, 0.1)',
                filter: 'blur(100px)', borderRadius: '50%'
            }} />

            <div className="glass-card" style={{
                width: '100%',
                maxWidth: '450px',
                padding: '3rem',
                border: '1px solid rgba(255,255,255,0.08)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        Welcome <span style={{ color: 'var(--primary-neon)' }}>Back</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Secure Access Portal</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Email Address</label>
                        <input
                            type="email"
                            defaultValue="exporter@manthan.com"
                            style={{
                                width: '100%', padding: '1rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none',
                                transition: 'all 0.3s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary-neon)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Password</label>
                        <input
                            type="password"
                            defaultValue="password123"
                            style={{
                                width: '100%', padding: '1rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary-neon)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: isLoading ? 0.8 : 1
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link href="/register" style={{ color: 'var(--primary-neon)', fontWeight: 'bold' }}>Register Now</Link>
                </p>
            </div>
        </div>
    );
}
