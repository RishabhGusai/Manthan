export default function Pricing() {
    return (
        <div className="container section">
            <h1 className="section-title">Pricing Plans</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #ddd' }}>
                    <h2>Starter</h2>
                    <p style={{ fontSize: '2.5rem', margin: '1rem 0', fontWeight: 'bold' }}>Free</p>
                    <ul style={{ listStyle: 'none', marginBottom: '2rem', textAlign: 'left' }}>
                        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ Basic Document Templates</li>
                        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ 1 Active Shipment</li>
                        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ Email Support</li>
                    </ul>
                    <button className="btn btn-outline">Get Started</button>
                </div>

                <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--primary-red)', transform: 'scale(1.05)' }}>
                    <h2 style={{ color: 'var(--primary-red)' }}>Pro</h2>
                    <p style={{ fontSize: '2.5rem', margin: '1rem 0', fontWeight: 'bold' }}>$49/mo</p>
                    <ul style={{ listStyle: 'none', marginBottom: '2rem', textAlign: 'left' }}>
                        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ Unlimited Documents</li>
                        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ 10 Active Shipments</li>
                        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ Priority Support</li>
                        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ Real-time Tracking</li>
                    </ul>
                    <button className="btn btn-primary">Choose Pro</button>
                </div>

                <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #333' }}>
                    <h2>Enterprise</h2>
                    <p style={{ fontSize: '2.5rem', margin: '1rem 0', fontWeight: 'bold' }}>Custom</p>
                    <ul style={{ listStyle: 'none', marginBottom: '2rem', textAlign: 'left' }}>
                        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ Full API Access</li>
                        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ Unlimited Shipments</li>
                        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ Dedicated Manager</li>
                        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ Custom Integrations</li>
                    </ul>
                    <button className="btn btn-outline">Contact Sales</button>
                </div>

            </div>
        </div>
    );
}
