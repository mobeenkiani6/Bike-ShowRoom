import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bikes = () => {
    const [bikes, setBikes] = useState([]);
    const [selectedBike, setSelectedBike] = useState(null);

    useEffect(() => {
        fetchBikes();
    }, []);

    const fetchBikes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/bikes');
            setBikes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleViewDetails = (bike) => {
        setSelectedBike(bike);
    };

    const closeDetails = () => {
        setSelectedBike(null);
    };

    return (
        <div className="page-container" style={{ position: 'relative' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--primary-color)' }}>
                Explore Our Bikes
            </h1>

            <div className="grid grid-3">
                {bikes.map((bike) => (
                    <div key={bike._id} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                        {/* Image Container */}
                        <div style={{
                            height: '12rem',
                            backgroundColor: '#374151',
                            marginBottom: '1rem',
                            borderRadius: '0.5rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {bike.image ? (
                                <img
                                    src={bike.image}
                                    alt={`${bike.make} ${bike.model}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.5rem',
                                    color: '#6b7280'
                                }}>
                                    🏍️
                                </div>
                            )}
                        </div>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            {bike.make} {bike.model}
                        </h2>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#9ca3af', marginBottom: '1rem' }}>
                            <span>{bike.year}</span>
                            <span>{bike.mileage} km</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                ${bike.price}
                            </span>
                            <button
                                className="btn-secondary"
                                style={{ padding: '0.25rem 1rem', fontSize: '0.875rem' }}
                                onClick={() => handleViewDetails(bike)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedBike && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(5px)'
                }} onClick={closeDetails}>
                    <div style={{
                        backgroundColor: '#1a1a1a',
                        padding: '2rem',
                        borderRadius: '1rem',
                        maxWidth: '500px',
                        width: '90%',
                        border: '1px solid #333',
                        position: 'relative',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }} onClick={e => e.stopPropagation()}>
                        <button
                            onClick={closeDetails}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
                        >
                            &times;
                        </button>

                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--primary-color)' }}>
                            {selectedBike.make} {selectedBike.model}
                        </h2>

                        {selectedBike.image && (
                            <img
                                src={selectedBike.image}
                                alt={selectedBike.model}
                                style={{
                                    width: '100%',
                                    borderRadius: '0.5rem',
                                    marginBottom: '1.5rem',
                                    maxHeight: '300px',
                                    objectFit: 'cover'
                                }}
                            />
                        )}

                        <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
                            {selectedBike.year} • {selectedBike.condition}
                        </p>

                        <div style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: '#d1d5db' }}>
                            {selectedBike.description || "No description provided."}
                        </div>

                        <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ background: '#0f0f0f', padding: '1rem', borderRadius: '0.5rem' }}>
                                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Mileage</p>
                                <p style={{ fontWeight: 'bold' }}>{selectedBike.mileage} km</p>
                            </div>
                            <div style={{ background: '#0f0f0f', padding: '1rem', borderRadius: '0.5rem' }}>
                                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Price</p>
                                <p style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>${selectedBike.price}</p>
                            </div>
                        </div>

                        {/* Contact Form Section */}
                        <div style={{ borderTop: '1px solid #333', paddingTop: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Contact Seller</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                axios.post('http://localhost:5000/api/messages', {
                                    bikeId: selectedBike._id,
                                    bikeModel: `${selectedBike.make} ${selectedBike.model}`,
                                    senderName: formData.get('name'),
                                    senderEmail: formData.get('email'),
                                    message: formData.get('message')
                                }).then(() => {
                                    alert('Message sent to seller!');
                                    e.target.reset();
                                }).catch(() => alert('Failed to send message.'));
                            }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input name="name" required className="input-field" placeholder="Your Name" />
                                <input name="email" type="email" required className="input-field" placeholder="Your Email" />
                                <textarea name="message" required rows="3" className="input-field" placeholder="I'm interested in this bike..."></textarea>
                                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bikes;