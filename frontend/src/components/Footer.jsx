import React, { useState } from "react";
import { Link } from "react-router-dom";
import { successToast, errorToast } from "../utils/Toast";
import "./Footer.css";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return errorToast("Please enter a valid email");
    }
    // In a real app you'd send this to your backend or marketing tool
    successToast("Subscribed! Thanks for staying in touch 😊");
    setEmail("");
  };

   const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      svg: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.5 2c-2.48 0-4.5 2.24-4 4.7-3.75-.18-7.08-2.06-9.3-4.88-.42.72-.66 1.55-.66 2.44 0 1.7.87 3.2 2.2 4.08A4.48 4.48 0 012 10v.06c0 2.31 1.64 4.24 3.86 4.68-.4.12-.83.18-1.27.18-.31 0-.62-.03-.91-.09.62 2 2.42 3.45 4.55 3.49A9.03 9.03 0 010 19.54 12.78 12.78 0 006.9 21c8.28 0 12.82-6.86 12.82-12.82 0-.2 0-.39-.02-.58A9.2 9.2 0 0023 3z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      svg: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M4.98 3.5a2.5 2.5 0 11-.01 0zM3 8.5H7v11H3zM9.5 8.5h3.5v1.5h.05c.49-.93 1.7-1.9 3.5-1.9 3.74 0 4.45 2.46 4.45 5.66v6.74h-4V14.5c0-1.46-.03-3.33-2.03-3.33-2.04 0-2.35 1.6-2.35 3.21v6.06h-4z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com",
      svg: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M12 .5C5.648.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.52-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.12.08 1.72 1.16 1.72 1.16 1 .17 1.7.98 1.7.98 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.53-2.56-.3-5.25-1.28-5.25-5.7 0-1.26.45-2.3 1.16-3.11-.12-.29-.5-1.47.11-3.06 0 0 .95-.3 3.12 1.18a11 11 0 015.68 0c2.17-1.48 3.11-1.18 3.11-1.18.62 1.59.24 2.77.12 3.06.72.8 1.17 1.85 1.17 3.11 0 4.44-2.7 5.39-5.27 5.67.41.33.78.98.78 1.98v2.93c0 .3.2.66.8.55A11.51 11.51 0 0023.5 12C23.5 5.65 18.352.5 12 .5z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand-mark">IS</div>
          <div className="brand-info">
            <h3 className="brand-title">IdeaShare</h3>
            <p className="brand-tag">Share. Collaborate. Build better ideas.</p>
          </div>
        </div>

        <div className="footer-columns">
          <div className="col">
            <h4>Product</h4>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Explore</Link>
            <Link to="/add">Add Idea</Link>
          </div>

          <div className="col">
            <h4>Company</h4>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/terms">Terms</a>
          </div>

          <div className="col">
            <h4>Connect</h4>
            <a href="mailto:info@ideashare.app">info@ideashare.app</a>
            <div className="social" aria-label="Social links">
             {socialLinks.map((s) => (
  <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name} className="social-btn">
    {s.svg}
  </a>
))}
            </div>
          </div>

          <div className="col newsletter">
            <h4>Get updates</h4>
            <p className="muted">Subscribe to our newsletter for product updates and inspiration.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                aria-label="Email for newsletter"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} <strong>IdeaShare</strong>. All rights reserved.</p>
        <p className="small">Built with ❤️ — Share your best ideas.</p>
      </div>
    </footer>
  );
}

export default Footer;