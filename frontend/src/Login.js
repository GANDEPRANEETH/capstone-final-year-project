import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Auth.css";
import axios from 'axios';
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
            const res = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }


            localStorage.setItem('token', data.token);

            if (onSuccess) onSuccess();
            else navigate('/');

        } catch (err) {
            console.error(err);
            setError('Network error');
        }

    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Login</h1>
                    <p>Sign in to continue</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </label>

                    <button type="submit" className="auth-primary">
                        Login
                    </button>

                    <label className="auth-remember">
                        <input type="checkbox" /> Remember me
                    </label>

                    <p className="auth-footer-text">
                        Do not have an account? <a href="/signup">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

