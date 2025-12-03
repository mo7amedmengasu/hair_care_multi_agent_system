import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api/api';
import '../../styles/register.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
            navigate('/login');
        } catch (err) {
            setError('Email already in use');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h1>Create Account</h1>
                <p className="subtext">Sign up to get started</p>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleRegister}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
                    <button type="submit" className="primary">Register</button>
                </form>
                <div className="switch">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}
