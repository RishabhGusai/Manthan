import Link from 'next/link';

export default function ExporterDashboard() {
    return (
        <div className="container section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ marginBottom: 0, textAlign: 'left' }}>Exporter Dashboard</h1>
                <button className="btn btn-primary">+ New Shipment</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-red)' }}>12</h2>
                    <p>Active Shipments</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'orange' }}>3</h2>
                    <p>Pending Approval</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'green' }}>$45k</h2>
                    <p>Payment Received</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#666' }}>5</h2>
                    <p>Completed This Month</p>
                </div>
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>Recent Shipments</h2>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Destination</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Value</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: 'EXP-001', dest: 'USA', status: 'In Transit', value: '$12,000' },
                            { id: 'EXP-002', dest: 'UAE', status: 'Customs Clearance', value: '$8,500' },
                            { id: 'EXP-003', dest: 'Germany', status: 'Pending Docs', value: '$15,000' },
                        ].map((row, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{row.id}</td>
                                <td style={{ padding: '1rem' }}>{row.dest}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        backgroundColor: row.status === 'In Transit' ? '#e3f2fd' : row.status === 'Pending Docs' ? '#fff3e0' : '#e8f5e9',
                                        color: row.status === 'In Transit' ? '#1976d2' : row.status === 'Pending Docs' ? '#f57c00' : '#388e3c'
                                    }}>
                                        {row.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>{row.value}</td>
                                <td style={{ padding: '1rem' }}>
                                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
