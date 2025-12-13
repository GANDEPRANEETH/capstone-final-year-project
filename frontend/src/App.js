import React, { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Lesson from "./components/Lesson";
import Quiz from "./components/Quiz";
import Chatbot from "./components/Chatbot";
import Login from "./Login";
import Signup from "./Signup";
import { Routes, Route, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const STEM_LESSONS = [
    {
        id: 1,
        title: "Bright Bulbs: Simple Circuits",
        subject: "Science – Electricity",
        content: "Learn how electric current flows in a simple circuit with a bulb and a battery."
    },
    {
        id: 2,
        title: "Fractions in Daily Life",
        subject: "Mathematics – Fractions",
        content: "Understand halves, thirds and quarters using food and classroom examples."
    },
    {
        id: 3,
        title: "First Steps in Coding",
        subject: "Technology – Programming",
        content: "Discover what algorithms are and how to give clear instructions to a computer."
    },
    {
        id: 4,
        title: "Build a Strong Bridge",
        subject: "Engineering – Structures",
        content: "Explore how shapes like triangles make bridges strong and safe."
    }
];

export default function App() {
    const [view, setView] = useState("dashboard");
    const [currentLesson, setCurrentLesson] = useState(null);
    const [lessons, setLessons] = useState(STEM_LESSONS);
    const navigate = useNavigate();


    useEffect(() => {
        // optional: fetch lessons from API
        // fetch(`${API}/lessons`).then(...)
    }, []);




        return (

            <div className="app-root">
                <Routes>

                    {/* Public routes */}
                    <Route path="/login" element={<Login onSuccess={() => navigate('/')}/>}/>
                    <Route path="/signup" element={<Signup onSuccess={() => navigate('/login')}/>}/>

                    {/* Main app (current home + dashboard/lessons/chatbot using view state) */}
                    <Route
                        path="/"
                        element={
                            <>
                                <section className="hero">
                                    <div className="hero-inner">
                                        <h1>Welcome</h1>
                                        <p className="hero-tagline">
                                            Gamified learning with lessons, quizzes and an AI chatbot.
                                        </p>
                                        <p>
                                            Start from basics, practice with problems, then ask the bot if you are stuck.
                                        </p>
                                        <button className="hero-cta">Start learning</button>
                                    </div>
                                </section>

                                

                                {/* Header with navigation buttons */}
                                <header className="app-header">
                                    <h1>Gamified Learning</h1>
                                    <button onClick={() => setView('dashboard')}>Dashboard</button>
                                    <button onClick={() => setView('chat')}>Chatbot</button>
                                    {/* Auth buttons that do NOT touch chatbot */}
                                    <button onClick={() => navigate('/login')}>Login</button>
                                    <button onClick={() => navigate('/signup')}>Sign up</button>
                                </header>

                                {/* Main content (exactly what you already have) */}
                                <main className="page-container">
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
                            </>
                        }
                    />
                </Routes>
            </div>
        );

}
