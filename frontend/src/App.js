import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import Lesson from './components/Lesson';
import Quiz from './components/Quiz';
import Chatbot from './components/Chatbot';
import axios from 'axios';
import { saveLessonsToIDB, getCachedLessons } from './idb';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';
const STEM_LESSONS = [
    {
        id: 1,
        title: 'Bright Bulbs: Simple Circuits',
        subject: 'Science – Electricity',
        content: 'Learn how electric current flows in a simple circuit with a bulb and a battery.',
    },
    {
        id: 2,
        title: 'Fractions in Daily Life',
        subject: 'Mathematics – Fractions',
        content: 'Understand halves, thirds and quarters using food and classroom examples.',
    },
    {
        id: 3,
        title: 'First Steps in Coding',
        subject: 'Technology – Programming',
        content: 'Discover what algorithms are and how to give clear instructions to a computer.',
    },
    {
        id: 4,
        title: 'Build a Strong Bridge',
        subject: 'Engineering – Structures',
        content: 'Explore how shapes like triangles make bridges strong and safe.',
    },
];



    export default function App() {

        const [view, setView] = useState('dashboard');
        const [lessons, setLessons] = useState(STEM_LESSONS);// ← make sure this line exists
        const [currentLesson, setCurrentLesson] = useState(null);
    return (

        <div className="app">
            <header className="app-header">
                <h1>Gamified Learning</h1>
                <button onClick={() => setView('dashboard')}>Dashboard</button>
                <button onClick={() => setView('chat')}>Chatbot</button>
            </header>



            <main>
                {view === 'dashboard' && (
                    <Dashboard
                        lessons={lessons}
                        onOpen={(l) => {
                            setCurrentLesson(l);
                            setView('lesson');
                        }}
                    />
                )}

                {view === 'lesson' && currentLesson && (
                    <Lesson
                        lesson={currentLesson}
                        onBack={() => setView('dashboard')}
                        onQuiz={() => setView('quiz')}
                    />
                )}

                {view === 'quiz' && currentLesson && (
                    <Quiz
                        lesson={currentLesson}
                        onBack={() => setView('lesson')}
                    />
                )}

                {view === 'chat' && <Chatbot/>}


            </main>

            <footer>
                <small>Designed for low-cost devices · Offline-friendly</small>
            </footer>


        </div>
    );
    }

