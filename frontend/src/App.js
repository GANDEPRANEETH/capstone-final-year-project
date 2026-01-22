import React, { useState, useEffect } from "react";
import "./App.css";
// Icons
import { 
  Gamepad2, Trophy, Star, Zap, Sparkles, 
  WifiOff, Languages, Bot, Calculator, Atom, 
  Monitor, Globe, BookOpen, Palette, Lock, Dumbbell,
  Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin,
  X, MessageCircle, ChevronDown
} from 'lucide-react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Components
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./components/Dashboard"; // This is your logged-in Subjects page
import Chatbot from "./components/Chatbot";
import { translations } from "./translations"; 

export default function App() {
  const [showChat, setShowChat] = useState(false);
  const [language, setLanguage] = useState("English");
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  // --- NEW: Authentication State ---
  // We check if the user is logged in (you can use localStorage or a real auth check)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const navigate = useNavigate();
  const location = useLocation(); 

  const t = translations[language]; 
  const languages = ["English", "Hindi", "Telugu"];

  // Helper to handle navigation
  const handleProtectedClick = (destination) => {
    if (isLoggedIn) {
      navigate(destination);
    } else {
      navigate("/login");
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="app-root">
      
      {/* ==================== HOME PAGE LAYOUT ==================== */}
      {isHomePage && (
        <>
          {/* 1. Navbar */}
          <nav className="navbar">
            <div className="logo"><Gamepad2 size={36} /> VidyaQuest</div>
            
            <div className="nav-links">
              {/* Home stays as is */}
              <span onClick={() => navigate("/")}>{t.nav.home}</span>
              
              {/* SUBJECTS: Checks if logged in */}
              <span onClick={() => handleProtectedClick("/dashboard")}>{t.nav.subjects}</span>
              
              {/* GAMES: Checks if logged in */}
              <span onClick={() => handleProtectedClick("/dashboard")}>{t.nav.games}</span>
              
              <span onClick={() => handleProtectedClick("/dashboard")}>{t.nav.leaderboard}</span>
            </div>

            <div className="auth-buttons">
              {/* Language Selector */}
              <div style={{position: 'relative'}}>
                <button className="btn-lang" onClick={() => setShowLangMenu(!showLangMenu)}>
                  <Globe size={18} /> {language} <ChevronDown size={14} />
                </button>
                {showLangMenu && (
                  <div className="lang-dropdown">
                    {languages.map(lang => (
                      <div key={lang} className="lang-option" onClick={() => { setLanguage(lang); setShowLangMenu(false); }}>
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Toggle Buttons based on login status */}
              {!isLoggedIn ? (
                <>
                  <span className="signin-link" onClick={() => navigate("/login")}>{t.nav.signin}</span>
                  <button className="btn-primary" onClick={() => navigate("/signup")}>{t.nav.signup}</button>
                </>
              ) : (
                 <button className="btn-primary" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
              )}
            </div>
          </nav>

          {/* ... (Your existing Hero, Why Choose Us, Explore Subjects, CTA sections here - NO CHANGE NEEDED) ... */}
          {/* Just for brevity, I'm hiding the middle sections in this snippet, but KEEP them in your file! */}
          <header className="hero-section">
            {/* ... Keep your existing Hero code ... */}
            <span className="grade-badge">{t.hero.badge}</span>
            <h1 className="hero-title">{t.hero.title1} <br /><span style={{color:'#3b82f6'}}>{t.hero.title2}</span></h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <div style={{display:'flex', justifyContent:'center', gap:'1rem'}}>
              <button className="btn-primary" onClick={() => navigate("/signup")}>{t.hero.btnStart}</button>
              <button className="btn-secondary">{t.hero.btnDemo}</button>
            </div>
             <div className="stats-row">
              <div className="stat-card"><span className="stat-num">10K+</span>{t.hero.stat1}</div>
              <div className="stat-card"><span className="stat-num">500+</span>{t.hero.stat2}</div>
              <div className="stat-card"><span className="stat-num">1000+</span>{t.hero.stat3}</div>
            </div>
          </header>

          <section className="section-container">
            <h2 className="section-header">{t.why.title}</h2>
            <div className="features-grid">
              <FeatureCard icon={<WifiOff />} color="bg-teal" title={t.why.card1Title} text={t.why.card1Text} />
              <FeatureCard icon={<Gamepad2 />} color="bg-orange" title={t.why.card2Title} text={t.why.card2Text} />
              <FeatureCard icon={<Languages />} color="bg-blue" title={t.why.card3Title} text={t.why.card3Text} />
              <FeatureCard icon={<Bot />} color="bg-pink" title={t.why.card4Title} text={t.why.card4Text} />
            </div>
          </section>

          <section className="section-container" style={{background:'#f8fafc'}}>
            <h2 className="section-header">{t.subjects.title}</h2>
            <div className="subjects-grid">
              <SubjectCard t={t} title={t.subjects.math} count="45" icon={<Calculator/>} color="grad-math" xp="1,200" progress={65} stars={5} onCardClick={() => handleProtectedClick("/dashboard")} />
              <SubjectCard t={t} title={t.subjects.science} count="52" icon={<Atom/>} color="grad-science" xp="980" progress={42} stars={4} onCardClick={() => handleProtectedClick("/dashboard")}/>
              <SubjectCard t={t} title={t.subjects.tech} count="38" icon={<Monitor/>} color="grad-tech" xp="650" progress={28} stars={3} onCardClick={() => handleProtectedClick("/dashboard")}/>
              
              <div className="subject-card card-locked">
                <div className="blur-layer"></div>
                <div className="lock-content">
                  <Lock size={32} style={{marginBottom:'10px'}}/>
                  <div>{t.subjects.complete}</div>
                </div>
              </div>

              <SubjectCard t={t} title={t.subjects.social} count="48" icon={<Globe/>} color="grad-social" xp="720" progress={35} stars={3} onCardClick={() => handleProtectedClick("/dashboard")}/>
              <SubjectCard t={t} title={t.subjects.eng} count="55" icon={<Languages/>} color="grad-english" xp="850" progress={50} stars={4} btnColor="#db2777" onCardClick={() => handleProtectedClick("/dashboard")}/>
              <SubjectCard t={t} title={t.subjects.hindi} count="50" icon={<BookOpen/>} color="grad-hindi" xp="780" progress={40} stars={4} onCardClick={() => handleProtectedClick("/dashboard")}/>
              <SubjectCard t={t} title={t.subjects.arts} count="35" icon={<Palette/>} color="grad-arts" xp="500" progress={20} stars={2} onCardClick={() => handleProtectedClick("/dashboard")}/>
              <SubjectCard t={t} title={t.subjects.pe} count="30" icon={<Dumbbell/>} color="grad-pe" xp="450" progress={25} stars={2} onCardClick={() => handleProtectedClick("/dashboard")}/>
            </div>
          </section>

          <section className="cta-section">
             <div className="cta-badge">{t.cta.badge}</div>
             <h2 className="cta-title">{t.cta.title}</h2>
             <p className="cta-sub">{t.cta.subtitle}</p>
             <button className="btn-white" onClick={() => navigate("/signup")}>{t.cta.btn}</button>
          </section>

          <footer className="footer">
             <div className="footer-grid">
                <div>
                   <div className="logo" style={{color:'white', marginBottom:'1.5rem'}}><Gamepad2 /> VidyaQuest</div>
                   <p style={{lineHeight:'1.6', opacity:0.8}}>{t.footer.desc}</p>
                </div>
                <div><h4>{t.footer.links}</h4><ul><li>{t.subjects.title}</li><li>{t.nav.games}</li><li>{t.nav.leaderboard}</li></ul></div>
                <div><h4>{t.footer.support}</h4><ul><li>{t.footer.contact}</li></ul></div>
                <div>
                  <h4>{t.footer.contact}</h4>
                  <ul style={{opacity:0.9}}>
                    <li style={{display:'flex', gap:'10px', alignItems:'center'}}><Mail size={16}/> contact@vidyaquest.edu</li>
                    <li style={{display:'flex', gap:'10px', alignItems:'center'}}><Phone size={16}/> +91 1234 567 890</li>
                    <li style={{display:'flex', gap:'10px', alignItems:'center'}}><MapPin size={16}/> Govt of Odisha</li>
                  </ul>
                </div>
             </div>
             <div className="copyright">{t.footer.rights}</div>
          </footer>
        </>
      )}

      {/* --- Chatbot (Global) --- */}
      <div className="chatbot-float-btn" onClick={() => setShowChat(!showChat)}>
        {showChat ? <X size={30} /> : <MessageCircle size={30} />}
      </div>
      {showChat && (
        <div className="chatbot-window">
          <div className="chatbot-header"><span>Vidya AI Tutor</span><X style={{cursor:'pointer'}} onClick={() => setShowChat(false)}/></div>
          <div className="chatbot-content"><Chatbot /></div>
        </div>
      )}

      {/* --- ROUTES --- */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Pass setIsLoggedIn to Login so it can update the state upon success */}
        <Route path="/login" element={<Login onSuccess={() => { setIsLoggedIn(true); navigate("/dashboard"); }} />} />
        
        <Route path="/signup" element={<Signup onSuccess={() => navigate("/login")} />} />
      </Routes>
    </div>
  );
}

// --- HELPER COMPONENTS ---
function FeatureCard({ icon, color, title, text }) {
  return (
    <div className="feature-card">
      <div className={`icon-box ${color}`}>{icon}</div>
      <h3 style={{fontSize:'1.3rem', margin:'0 0 10px'}}>{title}</h3>
      <p style={{color:'#64748b', lineHeight:'1.5', fontSize:'1.1rem'}}>{text}</p>
    </div>
  );
}

// Updated SubjectCard to accept onClick
function SubjectCard({ t, title, count, icon, color, xp, progress, stars, btnColor, onCardClick }) {
  return (
    <div className={`subject-card ${color}`} onClick={onCardClick} style={{cursor: 'pointer'}}>
      <div>
        <div className="subject-header">
           <div className="sub-icon">{icon}</div>
           <div className="star-tag"><Star size={12} fill="gold"/> {stars}</div>
        </div>
        <div style={{marginTop:'1.5rem'}}>
           <h3 style={{fontSize:'1.5rem', margin:'0 0 5px'}}>{title}</h3>
           <p style={{margin:0, opacity:0.9, fontSize:'1rem'}}>{count} {t.subjects.lessons}</p>
        </div>
      </div>
      <div>
         <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.9rem'}}>
           <span>{t.subjects.progress}</span><span>{progress}%</span>
         </div>
         <div className="progress-bar"><div className="progress-fill" style={{width: `${progress}%`}}></div></div>
         <div style={{fontSize:'1rem', fontWeight:'bold', marginBottom:'10px'}}>XP {xp}</div>
         <button className="btn-continue" style={btnColor ? {background: btnColor, color: 'white'} : {}}>{t.subjects.continue} {'>'}</button>
      </div>
    </div>
  );
}