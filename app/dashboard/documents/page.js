"use client";
import DashboardShell from '../../../components/DashboardShell';

export default function DocumentsPage() {
    return (
        <DashboardShell>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Documents</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage your trade documents and contracts.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {[1, 2, 3].map((item) => (
                    <div key={item} style={{
                        background: 'rgba(20, 25, 40, 0.7)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '40px', height: '40px',
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: '#3b82f6',
                                borderRadius: '8px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                📄
                            </div>
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                background: 'rgba(34, 197, 94, 0.1)',
                                color: '#22c55e',
                                borderRadius: '20px',
                                fontSize: '0.8rem'
                            }}>Verified</span>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Commercial Invoice #{8830 + item}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Updated 2 hours ago</p>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '0.5rem' }}>
                            <button className="btn" style={{ flex: 1, border: '1px solid rgba(255,255,255,0.1)' }}>View</button>
                            <button className="btn" style={{ flex: 1, border: '1px solid rgba(255,255,255,0.1)' }}>Download</button>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardShell>
    );
}
