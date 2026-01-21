import React from "react";
import { useNavigate } from "react-router-dom";
import { Gamepad2, Trophy, ArrowLeft } from "lucide-react";
import "./App.css";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      {/* Left Side (Orange) */}
      <div className="auth-left orange-theme">
        <div className="auth-brand">
          <Gamepad2 size={32} /> VidyaQuest
        </div>
        <h1 className="auth-title">Start Your <br/> Learning Journey!</h1>
        <p className="auth-desc">Join thousands of students learning STEM through fun games, quizzes, and challenges!</p>
        
        <div className="auth-feature-card">
          <div className="af-icon"><Trophy size={20} color="#f97316"/></div>
          <div>
            <strong>Earn Badges & XP</strong>
            <p>Complete lessons to unlock rewards</p>
          </div>
        </div>
        
        <div className="auth-feature-card">
          <div className="af-icon"><Gamepad2 size={20} color="#f97316"/></div>
          <div>
            <strong>Play & Learn</strong>
            <p>Fun games that teach STEM concepts</p>
          </div>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="auth-right">
        <div className="back-link" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Home
        </div>

        <div className="auth-form-box"> 
          <h2>Create Account</h2>
          <p className="form-sub">Start your learning journey today!</p>

          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" className="input-field" />

          <label>Email</label>
          <input type="email" placeholder="your@email.com" className="input-field" />

          <label>Grade</label>
          <select className="input-field">
            <option>Select your grade</option>
            <option>Grade 6</option>
            <option>Grade 7</option>
            <option>Grade 8</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
            <option>Grade 11</option>
            <option>Grade 12</option>
          </select>

          <label>Password</label>
          <input type="password" placeholder="........" className="input-field" />

          <label>Confirm Password</label>
          <input type="password" placeholder="........" className="input-field" />

          <button className="btn-auth orange-btn" onClick={() => navigate("/login")}>Create Account</button>

          {/* Added the Link Here */}
          <div style={{marginTop:'25px', textAlign:'center', fontSize:'1rem', paddingBottom: '20px'}}>
            Already have an account? <span style={{color:'#f97316', fontWeight:'bold', cursor:'pointer'}} onClick={() => navigate("/login")}>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  );
}