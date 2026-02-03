import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellBike = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        condition: 'Used',
        description: '',
        image: '' // Added image field
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sending formData which now includes the image URL string
            await axios.post('http://localhost:5000/api/bikes/add', formData);
            alert('Bike listed successfully!');
            navigate('/bikes');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || 'Error adding bike. Please check all fields.');
        }
    };

    return (
        <div className="page-container" style={{ maxWidth: '42rem' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--primary-color)' }}>Sell Your Bike</h1>
            <div className="card" style={{ padding: '2rem' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* --- Image Preview Section --- */}
                    {formData.image && (
                        <div style={{ width: '100%', height: '200px', borderRadius: '0.5rem', overflow: 'hidden', mb: '1rem' }}>
                            <img 
                                src={formData.image} 
                                alt="Preview" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL'; }}
                            />
                        </div>
                    )}

                    <div className="grid grid-2" style={{ gap: '1.5rem' }}>
                        <div>
                            <label>Make</label>
                            <input name="make" required onChange={handleChange} className="input-field" placeholder="e.g. Yamaha" />
                        </div>
                        <div>
                            <label>Model</label>
                            <input name="model" required onChange={handleChange} className="input-field" placeholder="e.g. R1" />
                        </div>
                    </div>

                    <div className="grid grid-2" style={{ gap: '1.5rem' }}>
                        <div>
                            <label>Year</label>
                            <input name="year" type="number" required onChange={handleChange} className="input-field" placeholder="2022" />
                        </div>
                        <div>
                            <label>Price ($)</label>
                            <input name="price" type="number" required onChange={handleChange} className="input-field" placeholder="15000" />
                        </div>
                    </div>

                    {/* --- Image URL Input --- */}
                    <div>
                        <label>Image URL</label>
                        <input 
                            name="image" 
                            type="text" 
                            onChange={handleChange} 
                            className="input-field" 
                            placeholder="https://example.com/bike-image.jpg" 
                        />
                        <small style={{ color: '#6b7280', marginTop: '0.25rem', display: 'block' }}>
                            Paste a direct link to an image (JPEG, PNG).
                        </small>
                    </div>

                    <div>
                        <label>Mileage (km)</label>
                        <input name="mileage" type="number" required onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea name="description" rows="4" onChange={handleChange} className="input-field" placeholder="Tell us about the bike..."></textarea>
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1.125rem' }}>
                        List Bike for Sale
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellBike;