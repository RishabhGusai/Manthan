"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
    const [activeSlide, setActiveSlide] = useState(0);

    const slides = [
        {
            title: "Automated Documentation",
            desc: "Generate perfect customs documents in seconds with AI precision.",
            icon: "📄"
        },
        {
            title: "Digital Compliance",
            desc: "Stay regulation-compliant across 150+ countries automatically.",
            icon: "🌐"
        },
        {
            title: "Secure Escrow",
            desc: "Bank-grade smart contracts ensure funds are safe until delivery.",
            icon: "🔒"
        },
        {
            title: "AI Logistics",
            desc: "Predictive routing to save cost and time on every shipment.",
            icon: "🤖"
        }
    ];

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div style={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                {/* Background Image */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: -1
                }}>
                    <Image
                        src="/images/hero-bg.png"
                        alt="Global Trade Network"
                        fill
                        style={{ objectFit: 'cover', opacity: 0.6 }}
                        priority
                    />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to bottom, transparent 0%, var(--bg-dark) 100%)'
                    }} />
                </div>

                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h1 className="animate-fade-in" style={{
                        fontSize: '4.5rem',
                        fontWeight: '800',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                        textShadow: '0 0 40px rgba(0, 242, 255, 0.3)'
                    }}>
                        Trade Beyond <br />
                        <span style={{
                            color: 'transparent',
                            background: 'linear-gradient(to right, #00f2ff, #7000ff)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text'
                        }}>Boundaries</span>
                    </h1>
                    <p className="animate-fade-in delay-100" style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-muted)',
                        maxWidth: '700px',
                        margin: '0 auto 3rem'
                    }}>
                        The next-generation trade OS. Unified documentation, instant compliance, and seamless logistics powered by intelligent automation.
                    </p>
                    <div className="animate-fade-in delay-200" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link href="/register" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                            Launch App
                        </Link>
                        <Link href="/how-it-works" className="btn btn-outline" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                            Explore Logic
                        </Link>
                    </div>
                </div>

                {/* Floating Elements Animation - REMOVED */}
                <div style={{
                    position: 'absolute', bottom: '10%', right: '10%',
                    width: '300px', height: '180px',
                    zIndex: 0
                }}>
                    {/* Card Removed */}
                </div>
            </section>

            {/* Feature Slider Section */}
            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '4rem',
                        alignItems: 'center'
                    }}>
                        <div className="animate-slide-left">
                            <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '2rem' }}>
                                The <span style={{ color: 'var(--primary-neon)' }}>Future</span><br /> of Logistics
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {slides.map((slide, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveSlide(idx)}
                                        style={{
                                            padding: '1.5rem',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            borderLeft: activeSlide === idx ? '4px solid var(--primary-neon)' : '4px solid transparent',
                                            background: activeSlide === idx ? 'rgba(0, 242, 255, 0.05)' : 'transparent',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <h3 style={{
                                            fontSize: '1.2rem',
                                            marginBottom: '0.5rem',
                                            color: activeSlide === idx ? 'var(--primary-neon)' : 'var(--text-muted)'
                                        }}>
                                            {slide.icon} {slide.title}
                                        </h3>
                                        <p style={{
                                            color: 'var(--text-muted)',
                                            fontSize: '0.95rem',
                                            display: activeSlide === idx ? 'block' : 'none',
                                            animation: 'fadeIn 0.5s'
                                        }}>
                                            {slide.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="animate-slide-right">
                            <div className="glass-card" style={{ padding: '0.5rem', overflow: 'hidden', position: 'relative', minHeight: '400px' }}>
                                <Image
                                    src="/images/documents.png"
                                    alt="Feature Preview"
                                    width={600}
                                    height={400}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 0 20px rgba(0,242,255,0.2))'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute', bottom: '2rem', left: '2rem',
                                    background: 'rgba(0,0,0,0.8)', padding: '1rem',
                                    borderRadius: '8px', border: '1px solid var(--primary-neon)'
                                }}>
                                    <div style={{ color: 'var(--primary-neon)', fontSize: '0.8rem' }}>ACTIVE MODULE</div>
                                    <div style={{ fontWeight: 'bold' }}>{slides[activeSlide].title}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Preview Section */}
            <section className="section" style={{ position: 'relative' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="section-title">Command Center</h2>
                    <div className="glass-card animate-float" style={{ padding: '10px', display: 'inline-block' }}>
                        <Image
                            src="/images/dashboard.png"
                            alt="Manthan Dashboard"
                            width={1000}
                            height={600}
                            style={{ borderRadius: '8px', border: '1px solid #333' }}
                        />
                    </div>
                </div>
                {/* Background Glow */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(112,0,255,0.15) 0%, transparent 70%)',
                    zIndex: -1
                }} />
            </section>

            {/* Call to Action */}
            <section className="section" style={{ textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Ready for the Upgrade?</h2>
                    <Link href="/register" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem' }}>
                        Initialize Access
                    </Link>
                </div>
            </section>
        </div>
    );
}

