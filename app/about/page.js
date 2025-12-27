export default function About() {
    return (
        <div className="container section">
            <h1 className="section-title">About Manthan</h1>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                    Manthan is a digital export–import facilitation platform that brings exporters,
                    importers, logistics partners, agents, and regulators together on one system.
                </p>

                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>Our Mission</h2>
                    <p>
                        To simplify international trade by automating documentation, ensuring compliance,
                        and providing secure financial and logistics solutions.
                    </p>
                </div>

                <h2 style={{ marginBottom: '1rem' }}>Why We Exist</h2>
                <p style={{ marginBottom: '1rem' }}>
                    International trade faces complex paperwork, regulatory hurdles, and trust issues.
                    Manthan solves this by providing a single digital platform where trade happens smoothly
                    and securely.
                </p>
            </div>
        </div>
    );
}
