export default function Contact() {
    return (
        <div className="container section">
            <h1 className="section-title">Contact Us</h1>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="card">
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label>Name</label>
                            <input type="text" style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Your Name" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label>Email</label>
                            <input type="email" style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="email@example.com" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label>Message</label>
                            <textarea rows="5" style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="How can we help?"></textarea>
                        </div>
                        <button className="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
