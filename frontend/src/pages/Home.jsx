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
  <div className="hero-content">
    <div className="hero-text">
      <span className="hero-badge">🚀 Build • Share • Grow</span>

      <h1>
        Turn Your Ideas Into
        <span> Reality</span>
      </h1>

      <p>
        Share, learn and build together — a platform where
        students and creators bring ideas to life.
      </p>

      <div className="hero-buttons">
        <button className="btn primary" onClick={handleGetStarted}>
          Get Started
        </button>

        <button className="btn secondary" onClick={handleExplore}>
          Explore Ideas
        </button>
      </div>

      <div className="hero-stats">
        <div>
          <h3>1.2k+</h3>
          <span>Ideas</span>
        </div>

        <div>
          <h3>800+</h3>
          <span>Members</span>
        </div>

        <div>
          <h3>300+</h3>
          <span>Projects</span>
        </div>
      </div>
    </div>

    <div className="hero-image">
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        alt="Students collaborating"
      />
    </div>
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
