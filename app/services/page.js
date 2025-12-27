export default function Services() {
    return (
        <div className="container section">
            <h1 className="section-title">Our Services</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                <div className="card">
                    <h3 style={{ color: 'var(--secondary-red)', marginBottom: '1rem' }}>Documentation</h3>
                    <ul style={{ listStylePosition: 'inside' }}>
                        <li>Auto-generated Invoices</li>
                        <li>Packing Lists</li>
                        <li>Bill of Lading</li>
                        <li>Certificate of Origin</li>
                    </ul>
                </div>

                <div className="card">
                    <h3 style={{ color: 'var(--secondary-red)', marginBottom: '1rem' }}>Logistics</h3>
                    <ul style={{ listStylePosition: 'inside' }}>
                        <li>Carrier Selection (AI)</li>
                        <li>Real-time GPS Tracking</li>
                        <li>Warehousing Partners</li>
                    </ul>
                </div>

                <div className="card">
                    <h3 style={{ color: 'var(--secondary-red)', marginBottom: '1rem' }}>Finance</h3>
                    <ul style={{ listStylePosition: 'inside' }}>
                        <li>Escrow Payments</li>
                        <li>Trade Loans</li>
                        <li>Invoice Discounting</li>
                        <li>Forex Locking</li>
                    </ul>
                </div>

                <div className="card">
                    <h3 style={{ color: 'var(--secondary-red)', marginBottom: '1rem' }}>Compliance</h3>
                    <ul style={{ listStylePosition: 'inside' }}>
                        <li>Customs Integration</li>
                        <li>Regulatory Alerts</li>
                        <li>Digital KYC</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
