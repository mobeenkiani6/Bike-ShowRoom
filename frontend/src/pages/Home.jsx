import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const heroStyle = {
        position: 'relative',
        height: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 50%, #2a0a0a 100%)'
    };

    const heroContent = {
        position: 'relative',
        zIndex: 10,
        padding: '0 1rem'
    };

    const titleStyle = {
        fontSize: '4rem', // Fallback
        fontWeight: 900,
        marginBottom: '1.5rem',
        lineHeight: 1.1
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Hero Section */}
            <div style={heroStyle}>
                <div style={heroContent}>
                    <h1 className="hero-title" style={titleStyle}>
                        RIDE <span style={{ color: 'var(--primary-color)' }}>YOUR</span> DREAM
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#a3a3a3', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        The ultimate destination for buying, selling, and upgrading your motorcycle.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <Link to="/bikes" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Browse Bikes</Link>
                        <Link to="/parts" className="btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Shop Parts</Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="page-container">
                <div className="grid grid-3" style={{ marginTop: '4rem' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                        <div style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>🏍️</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Buy & Sell</h3>
                        <p style={{ color: '#a3a3a3' }}>Find your next ride or sell your current one with ease.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                        <div style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>🔧</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Quality Parts</h3>
                        <p style={{ color: '#a3a3a3' }}>Upgrade your machine with premium spare parts.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                        <div style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>🤖</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Smart Tech</h3>
                        <p style={{ color: '#a3a3a3' }}>AI-powered recommendations and smart search.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
