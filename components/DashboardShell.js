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
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                background: 'rgba(20, 25, 40, 0.95)',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 100
            }}>
                <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src="/logo.jpg" alt="Manthan Logo" style={{ height: '40px', objectFit: 'contain' }} />
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>Manthan</span>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    color: isActive ? 'var(--bg-dark)' : 'var(--text-muted)',
                                    background: isActive ? 'var(--primary-neon)' : 'transparent',
                                    fontWeight: isActive ? 'bold' : 'normal',
                                    transition: 'all 0.2s',
                                    textDecoration: 'none'
                                }}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#333', backgroundImage: `url(${user?.avatar || ''})`, backgroundSize: 'cover' }} />
                        <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{user?.name || 'User'}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user?.role || 'Role'}</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <header style={{
                    height: '80px',
                    padding: '0 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(10, 14, 23, 0.8)',
                    backdropFilter: 'blur(10px)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 90
                }}>
                    <div style={{ color: 'var(--text-muted)' }}>
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowNotifications(!showNotifications)}>
                            <Bell size={24} color="var(--text-muted)" />
                            {notifications.length > 0 && (
                                <div style={{
                                    position: 'absolute', top: '-5px', right: '-5px',
                                    width: '10px', height: '10px',
                                    background: 'var(--primary-neon)',
                                    borderRadius: '50%'
                                }} />
                            )}

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="animate-fade-in" style={{
                                    position: 'absolute',
                                    top: '40px',
                                    right: '-10px',
                                    width: '320px',
                                    background: 'var(--bg-dark)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                                    zIndex: 100
                                }} onClick={e => e.stopPropagation()}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                                        <h4 style={{ margin: 0 }}>Notifications</h4>
                                        <X size={16} style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setShowNotifications(false); }} />
                                    </div>
                                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        {notifications.map(n => (
                                            <div key={n.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: n.type === 'alert' ? '#ff4d4d' : 'var(--primary-neon)' }}>
                                                    {n.title}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: '#ccc', margin: '0.2rem 0' }}>
                                                    {n.message}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                    {n.time}
                                                </div>
                                            </div>
                                        ))}
                                        {notifications.length === 0 && (
                                            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No new notifications</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div style={{ padding: '2rem', flex: 1 }}>
                    {children}
                </div>
            </main>

            {/* Global Chatbot */}
            <ChatWidget />
        </div>
    );
}
