import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { successToast } from "../utils/Toast";
import "./Navbar.css";

function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    successToast("Logged out");
    navigate("/login");
  };

  const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");
  const addBtnClass = ({ isActive }) =>
    isActive ? "nav-link add-btn active" : "nav-link add-btn";
  const authClass = ({ isActive }) =>
    isActive ? "nav-link auth-link active" : "nav-link auth-link";

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink to="/" className="nav-logo-link" end>
          IdeaShare
        </NavLink>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
        </li>

        {!loading && user && (
          <>
            <li>
              <NavLink to="/dashboard" className={navClass}>
                Explore
              </NavLink>
            </li>

            <li>
              <NavLink to="/add" className={addBtnClass}>
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
              <NavLink to="/login" className={authClass}>
                Login
              </NavLink>
            )
          ) : null}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
