import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api/api';
import '../../styles/login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser(email, password);
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/chat');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h1>Welcome Back</h1>
                <p className="subtext">Login to continue</p>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                    <button type="submit" className="primary">Login</button>
                </form>
                <div className="switch">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}
