import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export default function Signup({ onSuccess }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${API}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Signup failed');
                return;
            }

            if (onSuccess) onSuccess();
            else navigate('/login');
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div className="auth-page">
            <h2>Sign up</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </label>

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
                        minLength={6}
                    />
                </label>

                {error && <p className="auth-error">{error}</p>}

                <button type="submit">Create account</button>
            </form>

            <p>
                Already have an account?{' '}
                <button type="button" onClick={() => navigate('/login')}>
                    Login
                </button>
            </p>
        </div>
    );
}
