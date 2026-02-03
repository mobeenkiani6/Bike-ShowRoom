import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure styles are applied

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navStyle = {
        background: 'rgba(26, 26, 26, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #333',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%'
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    };

    const logoStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--primary-color)',
        letterSpacing: '1px'
    };

    const linkStyle = {
        color: '#a3a3a3',
        marginLeft: '2rem',
        fontWeight: 500
    };

    return (
        <nav style={navStyle}>
            <div style={containerStyle}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span style={logoStyle}>MOTO<span style={{ color: 'white' }}>HUB</span></span>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="nav-links" style={{ display: 'flex', marginRight: '2rem' }}>
                        <Link to="/" style={linkStyle}>Home</Link>
                        <Link to="/bikes" style={linkStyle}>Bikes</Link>
                        <Link to="/parts" style={linkStyle}>Parts</Link>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {token ? (
                            <>
                                <Link to="/sell-bike" style={{ ...linkStyle, fontSize: '0.9rem' }}>Sell Bike</Link>
                                <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.25rem 1rem', fontSize: '0.9rem' }}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{ color: '#a3a3a3', marginRight: '1rem' }}>Login</Link>
                                <Link to="/register" className="btn-primary" style={{ padding: '0.25rem 1rem', fontSize: '0.9rem' }}>Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
