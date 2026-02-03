import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state?.item;

    useEffect(() => {
        if (!item) {
            navigate('/parts');
        }
    }, [item, navigate]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        zip: '',
        paymentMethod: 'Credit Card',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const [loading, setLoading] = useState(false);

    if (!item) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            userDetails: {
                name: formData.name,
                email: formData.email
            },
            shippingAddress: {
                street: formData.street,
                city: formData.city,
                zip: formData.zip
            },
            items: [
                {
                    partId: item._id,
                    name: item.partName,
                    price: item.price,
                    quantity: 1
                }
            ],
            totalPrice: item.price,
            paymentMethod: formData.paymentMethod
        };

        try {
            await axios.post('http://localhost:5000/api/orders', orderData);
            alert('Order placed successfully!');
            navigate('/parts');
        } catch (err) {
            console.error(err);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container" style={{ maxWidth: '42rem' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--primary-color)' }}>Checkout</h1>

            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Order Summary</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #333' }}>
                    <span>{item.partName}</span>
                    <span style={{ fontWeight: 'bold' }}>${item.price}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', fontSize: '1.25rem' }}>
                    <span>Total</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>${item.price}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* User Details */}
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff' }}>Your Details</h3>
                    <div className="grid grid-2" style={{ gap: '1rem' }}>
                        <div>
                            <label>Full Name</label>
                            <input name="name" required onChange={handleChange} className="input-field" placeholder="John Doe" />
                        </div>
                        <div>
                            <label>Email</label>
                            <input name="email" type="email" required onChange={handleChange} className="input-field" placeholder="john@example.com" />
                        </div>
                    </div>
                </div>

                {/* Shipping Address */}
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff' }}>Shipping Address</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label>Street Address</label>
                            <input name="street" required onChange={handleChange} className="input-field" placeholder="123 Main St" />
                        </div>
                        <div className="grid grid-2" style={{ gap: '1rem' }}>
                            <div>
                                <label>City</label>
                                <input name="city" required onChange={handleChange} className="input-field" placeholder="New York" />
                            </div>
                            <div>
                                <label>ZIP Code</label>
                                <input name="zip" required onChange={handleChange} className="input-field" placeholder="10001" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Details */}
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff' }}>Payment Method</h3>
                    <div style={{ marginBottom: '1rem' }}>
                        <select name="paymentMethod" onChange={handleChange} className="input-field">
                            <option value="Credit Card">Credit Card</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>
                    </div>

                    {formData.paymentMethod === 'Credit Card' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label>Card Number</label>
                                <input name="cardNumber" required onChange={handleChange} className="input-field" placeholder="0000 0000 0000 0000" maxLength="19" />
                            </div>
                            <div className="grid grid-2" style={{ gap: '1rem' }}>
                                <div>
                                    <label>Expiry Date</label>
                                    <input name="expiry" required onChange={handleChange} className="input-field" placeholder="MM/YY" />
                                </div>
                                <div>
                                    <label>CVV</label>
                                    <input name="cvv" required onChange={handleChange} className="input-field" placeholder="123" maxLength="3" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', fontSize: '1.125rem', marginTop: '1rem' }}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : `Pay $${item.price}`}
                </button>
            </form>
        </div>
    );
};

export default Checkout;
