import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export default function Chatbot() {
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);

    const send = async () => {
        if (!message.trim()) return;
        const userMsg = message;
        setHistory(h => [...h, { who: 'me', text: userMsg }]);
        setMessage('');

        try {
            const res = await axios.post(`${API}/chatbot`, { message: userMsg });
            const botReply = res?.data?.reply || 'Sorry, I could not understand that.';
            setHistory(h => [...h, { who: 'me', text: userMsg }, { who: 'bot', text: botReply }]);
        } catch (e) {
            setHistory(h => [...h, { who: 'bot', text: 'Error: Could not reach chatbot.' }]);
        }
    };

    return (
        <div style={{ padding: '1rem', background: '#fff' }}>
            <h2>Chatbot</h2>

            <textarea
                style={{ width: '100%', height: '200px' }}
                placeholder="Type here..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        send();
                    }
                }}
            />

            <button onClick={send}>Send</button>

            <div style={{ marginTop: '1rem' }}>
                {history.map((m, i) => (
                    <div key={i}>
                        <strong>{m.who}:</strong> {m.text}
                    </div>
                ))}
            </div>
        </div>
    );
}
