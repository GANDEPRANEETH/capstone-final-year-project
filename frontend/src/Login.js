import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export default function Login({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${API}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            // store token for later protected calls
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            if (onSuccess) onSuccess();
            else navigate('/'); // fallback
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div className="auth-page">
            <h2>Login</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>

                {error && <p className="auth-error">{error}</p>}

                <button type="submit">Login</button>
            </form>

            <p>
                Don&apos;t have an account?{' '}
                <button type="button" onClick={() => navigate('/signup')}>
                    Sign up
                </button>
            </p>
        </div>
    );
}
