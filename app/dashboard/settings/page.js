"use client";
import DashboardShell from '../../../components/DashboardShell';
import { User, Bell, Shield, Key } from 'lucide-react';

export default function SettingsPage() {
    return (
        <DashboardShell>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Settings</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage your account preferences and security.</p>
            </div>

            <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Profile Section */}
                <div style={{
                    background: 'rgba(20, 25, 40, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#3b82f6' }}>
                            <User size={24} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.25rem' }}>Profile Settings</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Update your personal information</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Full Name</label>
                            <input type="text" defaultValue="John Doe" style={{
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                padding: '0.75rem', borderRadius: '8px', color: '#fff'
                            }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email Address</label>
                            <input type="email" defaultValue="john@example.com" style={{
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                padding: '0.75rem', borderRadius: '8px', color: '#fff'
                            }} />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div style={{
                    background: 'rgba(20, 25, 40, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '12px', color: '#a855f7' }}>
                            <Bell size={24} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.25rem' }}>Notifications</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure how you receive alerts</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {['Email Notifications', 'Push Notifications', 'Weekly Reports'].map((item) => (
                            <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                                <span>{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Security */}
                <div style={{
                    background: 'rgba(20, 25, 40, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '12px', color: '#22c55e' }}>
                            <Shield size={24} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.25rem' }}>Security</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Protect your account</p>
                        </div>
                    </div>

                    <button className="btn" style={{ background: 'var(--primary-neon)', border: 'none', width: 'fit-content' }}>
                        Change Password
                    </button>
                </div>

            </div>
        </DashboardShell>
    );
}
