import React from "react";
import { useNavigate } from "react-router-dom";
import { Gamepad2, ArrowLeft, Eye } from "lucide-react";
import "./App.css";

export default function Login({ onSuccess }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    // In a real app, you would verify email/password with backend here.
    // For now, we simulate a successful login.
    if(onSuccess) {
        onSuccess(); // This tells App.js "User is logged in!"
    }
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      {/* Left Side (Blue/Green Gradient) */}
      <div className="auth-left blue-theme">
        <div className="auth-brand">
          <Gamepad2 size={32} /> VidyaQuest
        </div>
        <h1 className="auth-title">Continue Your <br/> Learning Adventure!</h1>
        <p className="auth-desc">Pick up where you left off. Your progress, badges, and achievements are waiting for you.</p>
        
        <div className="stats-mini-row">
           <div className="mini-stat">
             <strong>500+</strong><span>Active Learners</span>
           </div>
           <div className="mini-stat">
             <strong>10K+</strong><span>Lessons Done</span>
           </div>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="auth-right">
        <div className="back-link" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Home
        </div>

        <div className="auth-form-box">
          <h2>Welcome Back!</h2>
          <p className="form-sub">Sign in to continue your learning adventure</p>

          <label>Email</label>
          <input type="email" placeholder="your@email.com" className="input-field" />

          <label>Password</label>
          <div style={{position:'relative'}}>
             <input type="password" placeholder="........" className="input-field" />
             <Eye size={18} style={{position:'absolute', right:'15px', top:'15px', opacity:0.5}} />
          </div>
          
          <div style={{textAlign:'right', fontSize:'0.9rem', color:'#0d9488', marginBottom:'20px', cursor:'pointer'}}>Forgot Password?</div>

          <button className="btn-auth blue-btn" onClick={handleLogin}>Sign In</button>

          <div style={{marginTop:'20px', textAlign:'center', fontSize:'0.9rem'}}>
            Don't have an account? <span style={{color:'#0d9488', fontWeight:'bold', cursor:'pointer'}} onClick={() => navigate("/signup")}>Sign Up</span>
          </div>
        </div>
      </div>
    </div>
  );
}