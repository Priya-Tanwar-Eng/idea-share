import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { successToast } from "../utils/Toast";
import "./Navbar.css";

function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    successToast("Logged out");
    navigate("/login");
    setMenuOpen(false);
  };

  const close = () => setMenuOpen(false);

  const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");
  const addBtnClass = ({ isActive }) => (isActive ? "nav-link add-btn active" : "nav-link add-btn");
  const authClass = ({ isActive }) => (isActive ? "nav-link auth-link active" : "nav-link auth-link");

  const links = (
    <>
      <li>
        <NavLink to="/" className={navClass} end onClick={close}>
          Home
        </NavLink>
      </li>

      {!loading && user && (
        <>
          <li>
            <NavLink to="/dashboard" className={navClass} onClick={close}>
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" className={addBtnClass} onClick={close}>
              Add Idea
            </NavLink>
          </li>
        </>
      )}

      <li>
        {!loading ? (
          user ? (
            <button onClick={handleLogout} className="auth-btn btn-ghost">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={authClass} onClick={close}>
              Login
            </NavLink>
          )
        ) : null}
      </li>
    </>
  );

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink to="/" className="nav-logo-link" end onClick={close}>
          IdeaShare
        </NavLink>
      </div>

      {/* Desktop links */}
      <ul className="nav-links">{links}</ul>

      {/* Hamburger button (mobile) */}
      <button
        className={`hamburger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen((p) => !p)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile dropdown */}
      <ul className={`nav-mobile-menu${menuOpen ? " open" : ""}`}>{links}</ul>
    </nav>
  );
}

export default Navbar;