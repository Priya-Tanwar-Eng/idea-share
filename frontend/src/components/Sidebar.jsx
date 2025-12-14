import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Sidebar.css";

const Icon = ({ name }) => {
  // Minimal inline icons (SVG). Add more if you like.
  const icons = {
    all: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor" />
        <rect x="14" y="3" width="7" height="7" rx="2" fill="currentColor" opacity="0.85"/>
        <rect x="3" y="14" width="7" height="7" rx="2" fill="currentColor" opacity="0.7"/>
        <rect x="14" y="14" width="7" height="7" rx="2" fill="currentColor" opacity="0.55"/>
      </svg>
    ),
    mine: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill="currentColor"/>
        <path d="M4 20a8 8 0 0 1 16 0" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
    add: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    profile: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill="currentColor"/>
        <rect x="3" y="16" width="18" height="5" rx="2" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
    logout: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  };

  return <span className="sidebar-icon" aria-hidden>{icons[name]}</span>;
};

const Sidebar = ({ setValue, value }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    
    <aside className="sidebar">
      <div className="sidebar-card">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-mark">IS</div>
            <div className="brand-text">IdeaShare</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <ul>
            <li
              className={`sidebar-item ${value === "" ? "active" : ""}`}
              onClick={() => setValue("")}
            >
              <Icon name="all" />
              <span className="sidebar-label">All Ideas</span>
            </li>

            <li
              className={`sidebar-item ${value === "myIdea" ? "active" : ""}`}
              onClick={() => setValue("myIdea")}
            >
              <Icon name="mine" />
              <span className="sidebar-label">My Ideas</span>
            </li>

            <li>
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <Icon name="add" />
                <span className="sidebar-label">Add New</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <Icon name="profile" />
                <span className="sidebar-label">Profile</span>
              </NavLink>
            </li>

            <li className="sidebar-item sidebar-logout" onClick={handleLogout}>
              <Icon name="logout" />
              <span className="sidebar-label">Logout</span>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
