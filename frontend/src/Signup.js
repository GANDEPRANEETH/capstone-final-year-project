import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Auth.css";
import axios from 'axios';
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
            const res = await fetch('http://localhost:4000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
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
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Sign up</h1>
                    <p>Sign up to continue</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                        />
                    </label>

                    <button type="submit" className="auth-primary">
                        Sign up
                    </button>
                    <label className="auth-remember">
                        <input type="checkbox"/> Remember me
                    </label>

                    <div className="auth-divider">or sign up with</div>

                    <div className="auth-providers">
                        <button type="button">Google</button>
                        <button type="button">LinkedIn</button>
                        <button type="button">SSO</button>
                    </div>

                    <p className="auth-footer-text">
                        Already have an account? <a href="/login">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
