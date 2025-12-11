import React, { useState } from 'react';

export default function Quiz({ lesson, onBack }) {
    const [score, setScore] = useState(null);
    const questions = lesson.quiz || [];


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        let s = 0;

        questions.forEach((ques, i) => {
            const answer = form[`q${i}`].value.trim().toLowerCase();
            if (answer === ques.a) s++;
        });

        setScore(s);
    };

    return (
        <div className="quiz-page">
            <button className="btn secondary" onClick={onBack}>
                ← Back
            </button>

            <h2>Quick Quiz: {lesson.title}</h2>

            <form onSubmit={handleSubmit} className="quiz-form">
                {questions.map((ques, i) => (
                    <div key={i} className="quiz-question">
                        <label>
                            {i + 1}. {ques.q}{' '}
                            <span className="quiz-hint">(yes / no)</span>
                        </label>
                        <input
                            name={`q${i}`}
                            type="text"
                            autoComplete="off"
                            required
                        />
                    </div>
                ))}

                <button className="btn primary" type="submit">
                    Submit
                </button>
            </form>

            {score !== null && (
                <p className="quiz-score">
                    You scored {score} / {questions.length}
                </p>
            )}
        </div>
    );
}
