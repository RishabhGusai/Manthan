"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Ship,
    Settings,
    LogOut,
    Bell,
    Menu,
    Search,
    X
} from 'lucide-react';
import ChatWidget from './ChatWidget';
import { useGlobal } from '../context/GlobalContext';

export default function DashboardShell({ children }) {
    const { user, notifications } = useGlobal();
    const pathname = usePathname();
    const [showNotifications, setShowNotifications] = useState(false);

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'My Trades', href: '/dashboard/trades', icon: <Ship size={20} /> },
        { name: 'Create Trade', href: '/dashboard/create-trade', icon: <span style={{ fontSize: '1.2rem' }}>➕</span> },
        { name: 'Finance', href: '/dashboard/finance', icon: <span style={{ fontSize: '1.2rem' }}>💰</span> },
        { name: 'Documents', href: '/dashboard/documents', icon: <FileText size={20} /> },
        { name: 'AI Wizard', href: '/dashboard/documents/ai-wizard', icon: <span style={{ fontSize: '1.2rem' }}>🤖</span> },
        { name: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} /> },
        { name: 'Admin Panel', href: '/dashboard/admin', icon: <span style={{ fontSize: '1.2rem' }}>🛡️</span> },
    ];

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            color: 'var(--text-main)',
            fontFamily: 'Inter, sans-serif'
        }}>
            {/* Background Image Layer - Conditional */}
            {/* Background Image Layer - Conditional */}
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 0,
                background: 'radial-gradient(circle at top left, #1a202c, #0a0e17)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            </div>

            {/* Sidebar */}
            <aside style={{
                width: '240px', // Widened for text
                background: 'rgba(10, 15, 25, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                padding: '2rem 1rem', // Added horizontal padding
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 100,
                transition: 'all 0.3s ease'
            }}>
                <Link href="/" style={{ marginBottom: '3rem', paddingLeft: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                        width: '40px', height: '40px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, var(--primary-accent), var(--accent-secondary))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 15px rgba(0, 242, 255, 0.3)'
                    }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#000' }}>M</span>
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '1px' }}>MANTHAN</span>
                </Link>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem', // Space between icon and text
                                    padding: '0.8rem 1rem',
                                    borderRadius: '12px',
                                    color: isActive ? '#000' : 'var(--text-muted)',
                                    background: isActive ? 'var(--primary-accent)' : 'transparent',
                                    fontWeight: isActive ? '600' : '400',
                                    transition: 'all 0.2s',
                                    textDecoration: 'none'
                                }}
                            >
                                {React.cloneElement(item.icon, {
                                    size: 20,
                                    color: isActive ? '#000' : 'currentColor'
                                })}
                                <span style={{ fontSize: '0.95rem' }}>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '35px', height: '35px',
                            borderRadius: '50%',
                            border: '2px solid var(--primary-accent)',
                            backgroundImage: `url(${user?.avatar || '/images/dashboard.png'})`,
                            backgroundSize: 'cover'
                        }} />
                        <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>John Doe</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Logistics Mgr</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                marginLeft: '240px', // Updated margin
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Header - Transparent and floating */}
                <header style={{
                    height: '80px',
                    padding: '0 3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    background: 'transparent',
                }}>
                    {/* Centered Top Widgets could go here, but keeping it simple for now */}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        {/* Weather/Location Pill (Simulated from image) */}
                        <div className="glass-card" style={{
                            padding: '0.5rem 1rem',
                            display: 'flex', gap: '1rem',
                            borderRadius: '50px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(0,0,0,0.3)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                <span>📍 58.5000° N, 1.5000° E</span>
                            </div>
                            <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                <span>☁️ 24°C Clear</span>
                            </div>
                        </div>

                        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowNotifications(!showNotifications)}>
                            <div style={{
                                width: '40px', height: '40px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                backdropFilter: 'blur(5px)'
                            }}>
                                <Bell size={20} color="var(--primary-accent)" />
                            </div>
                            {notifications.length > 0 && (
                                <div style={{
                                    position: 'absolute', top: '-5px', right: '-5px',
                                    width: '10px', height: '10px',
                                    background: '#ff4d4d',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 10px #ff4d4d'
                                }} />
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div style={{ padding: '0 3rem 3rem 3rem', flex: 1 }}>
                    {children}
                </div>
            </main>

            {/* Global Chatbot */}
            <ChatWidget />
        </div >
    );
}
