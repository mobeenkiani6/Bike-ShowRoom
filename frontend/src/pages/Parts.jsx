import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Parts = () => {
    const navigate = useNavigate();
    const [parts, setParts] = useState([]);
    const [search, setSearch] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetchParts();
        fetchRecommendations();
    }, []);

    const fetchParts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/parts');
            setParts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchRecommendations = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/parts/recommendations');
            setRecommendations(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = async (e) => {
        setSearch(e.target.value);
        if (e.target.value.length > 2) {
            try {
                const res = await axios.get(`http://localhost:5000/api/parts/search?q=${e.target.value}`);
                setParts(res.data);
            } catch (err) {
                console.error(err);
            }
        } else if (e.target.value === '') {
            fetchParts();
        }
    };

    const handleBuy = (part) => {
        if (part.stock > 0) {
            navigate('/checkout', { state: { item: part } });
        }
    };

    return (
        <div className="page-container">
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--primary-color)' }}>Spare Parts</h1>

            {/* Search Section */}
            <div style={{ marginBottom: '3rem' }}>
                <input
                    type="text"
                    placeholder="Search by part name, model, or category..."
                    className="input-field"
                    style={{ fontSize: '1.25rem', padding: '1rem' }}
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            {/* Recommendations Section */}
            {recommendations.length > 0 && !search && (
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Recommended for You</h2>
                    <div className="grid grid-4" style={{ gap: '1.5rem' }}>
                        {recommendations.map(part => (
                            <div key={part._id} className="card" style={{ padding: '1rem', borderLeft: '4px solid var(--primary-color)' }}>
                                <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{part.partName}</h3>
                                <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{part.bikeModel}</p>
                                <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>${part.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Grid */}
            <div className="grid grid-4">
                {parts.map((part) => (
                    <div key={part._id} className="card">
                        <div style={{ height: '8rem', backgroundColor: '#374151', marginBottom: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>⚙️</div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{part.partName}</h2>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>{part.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Stock: {part.stock}</p>
                                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>${part.price}</p>
                            </div>
                            <button
                                onClick={() => handleBuy(part)}
                                className="btn-primary"
                                style={{ padding: '0.25rem 1rem', fontSize: '0.875rem' }}
                                disabled={part.stock <= 0}
                            >
                                {part.stock > 0 ? 'Buy Now' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Parts;
