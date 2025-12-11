import React from 'react';

export default function Dashboard({ lessons = [], onOpen }) {
    return (
        <div className="dashboard">
            <h2>Lessons</h2>

            <div className="lessons-grid">
                {lessons.map((l) => (
                    <div
                        key={l.id}
                        className="card lesson-card"
                        onClick={() => onOpen(l)}
                    >
                        <h3>{l.title}</h3>
                        <p className="lesson-subject">{l.subject}</p>
                        <div className="badge">+XP</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
