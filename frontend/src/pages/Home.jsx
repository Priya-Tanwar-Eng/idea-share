import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import "./Home.css";

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) navigate("/dashboard");
    else navigate("/signup");
  };

  const handleExplore = () => {
    if (user) navigate("/dashboard");
    else navigate("/login");
  };

  return (
    <>
      <Navbar />

      <main className="home-main">
        <section className="hero">
          <div className="hero-left">
            <h1 className="hero-title">
              Turn Your Ideas Into Reality
            </h1>
            <p className="hero-sub">
              Share, learn and build together — a platform where students and creators bring ideas to life.
            </p>

            <div className="hero-ctas">
              <button className="btn primary" onClick={handleGetStarted}>
                Get Started
              </button>
              <button className="btn ghost" onClick={handleExplore}>
                Explore Ideas
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <strong>1.2k+</strong>
                <span>Ideas</span>
              </div>
              <div className="stat">
                <strong>800+</strong>
                <span>Members</span>
              </div>
              <div className="stat">
                <strong>300+</strong>
                <span>Projects</span>
              </div>
            </div>
          </div>

          <div className="hero-right" aria-hidden>
            {/* Decorative SVG illustration */}
            <svg viewBox="0 0 512 512" className="hero-illustration" xmlns="http://www.w3.org/2000/svg" role="img">
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#6EE7B7" />
                  <stop offset="1" stopColor="#60A5FA" />
                </linearGradient>
                <linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#FDE68A" />
                  <stop offset="1" stopColor="#FB7185" />
                </linearGradient>
              </defs>

              <g fill="none" fillRule="evenodd">
                <rect x="40" y="48" width="352" height="288" rx="20" fill="url(#g1)" opacity="0.92" />
                <circle cx="360" cy="140" r="84" fill="url(#g2)" opacity="0.95" />
                <g transform="translate(88,112)">
                  <rect width="120" height="12" rx="6" fill="#ffffff" opacity="0.3" />
                  <rect y="28" width="200" height="14" rx="7" fill="#ffffff" opacity="0.2" />
                  <rect y="60" width="160" height="10" rx="5" fill="#ffffff" opacity="0.18" />
                </g>

                <g transform="translate(64,320)">
                  <rect width="40" height="14" rx="6" fill="#fff" opacity="0.08" />
                  <rect x="56" width="80" height="18" rx="8" fill="#fff" opacity="0.08" />
                </g>
              </g>
            </svg>
          </div>
        </section>

        <section className="features" aria-label="Features">
          <h2 className="features-title">Why IdeaShare?</h2>

          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Collaborate Easily</h3>
              <p>Share feedback, team up on projects, and iterate quickly with supportive peers.</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Ship Faster</h3>
              <p>Turn prototypes into working demos with a community of builders and learners.</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Learn & Grow</h3>
              <p>Discover new ideas, learn from others and gain practical experience with real projects.</p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
