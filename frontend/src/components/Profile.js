// frontend/src/components/Profile.js
import { useEffect, useState } from 'react';

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Not logged in');
            return;
        }

        fetch('http://localhost:4000/api/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(() => setError('Failed to load profile'));
    }, []);

    if (error) return <p>{error}</p>;
    if (!profile) return <p>Loading...</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <h2>User Profile</h2>
            <p>Email: {profile.email}</p>
        </div>
    );
}
