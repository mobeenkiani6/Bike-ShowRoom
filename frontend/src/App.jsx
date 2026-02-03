import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Bikes from './pages/Bikes';
import Parts from './pages/Parts';
import SellBike from './pages/SellBike';
import Checkout from './pages/Checkout';
import Chatbot from './components/Chatbot';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--background-dark)', color: 'var(--text-light)' }}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/bikes" element={<Bikes />} />
                <Route path="/parts" element={<Parts />} />
                <Route path="/sell-bike" element={<SellBike />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <ErrorBoundary>
                <Chatbot />
            </ErrorBoundary>
        </div>
    );
}

export default App;
