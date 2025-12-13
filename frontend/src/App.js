import React, { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Lesson from "./components/Lesson";
import Quiz from "./components/Quiz";
import Chatbot from "./components/Chatbot";
import Login from "./Login";
import Signup from "./Signup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from './components/Profile';

const API = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const STEM_LESSONS = [
    {
        id: 1,
        title: "Bright Bulbs: Simple Circuits",
        subject: "Science – Electricity",
        content: "Learn how electric current flows in a simple circuit with a bulb and a battery.",
        quiz: [
            { q: "Does electric current need a closed loop to flow?", a: "yes" },
            { q: "Is the battery the source of energy in this circuit?", a: "yes" }
            ]
    },
    {
        id: 2,
        title: "Fractions in Daily Life",
        subject: "Mathematics – Fractions",
        content: "Understand halves, thirds and quarters using food and classroom examples.",
        quiz: [
            { q: "Is 1/2 bigger than 1/3?", a: "yes" },
            { q: "Do two quarters make a half?", a: "yes" }
        ]
    },
    {
        id: 3,
        title: "First Steps in Coding",
        subject: "Technology – Programming",
        content: "Discover what algorithms are and how to give clear instructions to a computer.",
        quiz: [
            { q: "Is an algorithm a set of steps?", a: "yes" },
            { q: "Can a computer understand vague instructions?", a: "no" }
        ]
    },
    {
        id: 4,
        title: "Build a Strong Bridge",
        subject: "Engineering – Structures",
        content: "Explore how shapes like triangles make bridges strong and safe.",
        quiz: [
            { q: "Do triangles help make bridges stronger?", a: "yes" },
            { q: "Is a bridge only used for cars?", a: "no" }
        ]
    }
];

export default function App() {
    const [view, setView] = useState("dashboard");
    const [currentLesson, setCurrentLesson] = useState(null);
    const [lessons, setLessons] = useState(STEM_LESSONS);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));


    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);




        return (

            <div className="app-root">
                <Routes>

                    {/* Public routes */}
                    <Route path="/login" element={<Login onSuccess={() => navigate('/')}/>}/>
                    <Route path="/signup" element={<Signup onSuccess={() => navigate('/login')}/>}/>

                    {/* Main app (current home + dashboard/lessons/chatbot using view state) */}
                    <Route
                        path="/login"
                        element={
                            <Login
                                setIsLoggedIn={setIsLoggedIn}
                                onSuccess={() => setIsLoggedIn(true)}
                            />
                        }
                    />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/"
                        element={
                            <>
                                <section className="hero">
                                    <div className="hero-top-row">
                                        <div className="hero-spacer"/>
                                        <div className="hero-auth-buttons">
                                            <button onClick={() => navigate("/login")}>Login</button>
                                            <button onClick={() => navigate("/signup")}>Sign up</button>
                                            <button onClick={() => navigate('/profile')}>Profile</button>

                                        </div>
                                    </div>

                                    <div className="hero-text">
                                        <h1>Welcome</h1>
                                        <p className="hero-tagline">
                                            Gamified learning with lessons, quizzes and an AI chatbot.
                                        </p>
                                        <p>
                                            Start from basics, practice with problems, then ask the bot if you are
                                            stuck.
                                        </p>

                                        <button
                                            className="hero-cta"
                                            onClick={() => setView("dashboard")}
                                        >
                                            Start learning
                                        </button>
                                    </div>
                                </section>

                                {(view === "dashboard" || view === "chat") && (
                                    <header className="app-header">
                                        <h1>Gamified Learning</h1>
                                        <div className="app-header-tabs">
                                            <button onClick={() => setView("dashboard")}>Dashboard</button>
                                            <button onClick={() => setView("chat")}>Chatbot</button>
                                        </div>
                                    </header>
                                )}


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
                                            questions={currentLesson.questions}
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
