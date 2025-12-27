import Link from 'next/link';

export default function ImporterDashboard() {
    return (
        <div className="container section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ marginBottom: 0, textAlign: 'left' }}>Importer Dashboard</h1>
                <button className="btn btn-primary">Find Products</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-red)' }}>8</h2>
                    <p>Active Orders</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'orange' }}>2</h2>
                    <p>Pending Payment</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'green' }}>5</h2>
                    <p>Delivered</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#666' }}>0</h2>
                    <p>Disputes</p>
                </div>
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>Incoming Shipments</h2>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Order ID</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Origin</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>ETA</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: 'IMP-045', origin: 'China', eta: '2 Days', status: 'Arriving Soon' },
                            { id: 'IMP-046', origin: 'Vietnam', eta: '15 Days', status: 'On The Way' },
                            { id: 'IMP-047', origin: 'India', eta: '-', status: 'Processing' },
                        ].map((row, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{row.id}</td>
                                <td style={{ padding: '1rem' }}>{row.origin}</td>
                                <td style={{ padding: '1rem' }}>{row.eta}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        backgroundColor: row.status === 'Arriving Soon' ? '#fff3e0' : row.status === 'Processing' ? '#f5f5f5' : '#e3f2fd',
                                        color: row.status === 'Arriving Soon' ? '#f57c00' : row.status === 'Processing' ? '#9e9e9e' : '#1976d2'
                                    }}>
                                        {row.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}>Track</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
