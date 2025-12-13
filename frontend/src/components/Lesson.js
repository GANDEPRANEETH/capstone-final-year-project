import React, { useEffect,useState } from 'react';


import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export default function Lesson({ lesson, onBack, onQuiz }) {
    const[progress, setProgress] = useState(null);

    const saveProgress = async () => {
        try {
            await axios.post(`${API}/lessons/progress`, {
                studentId: "guest",
                lessonId: lesson.id,
            });
            alert("Progress saved (demo)");
        } catch (e) {
            console.log("Save progress failed", e);
        }
    };

    useEffect(() => {
        console.log("Lesson mounted");
    }, []);

    return (
        <div className="lesson-page">
            <button className="btn secondary" onClick={onBack}>
                ← Back
            </button>

            <h2>{lesson.title}</h2>

            <p className="lesson-subject">
                STEM Subject: <strong>{lesson.subject}</strong>
            </p>

            <article className="lesson-content">
                <p>{lesson.content}</p>
            </article>

            <div className="lesson-actions">
                <button className="btn primary" onClick={onQuiz}>
                    Take Quiz
                </button>
                <button className="btn" onClick={saveProgress}>
                    Mark Complete
                </button>
            </div>
        </div>
    );
}
