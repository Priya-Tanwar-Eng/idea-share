import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/fetchAPI";
import { successToast, errorToast } from "../utils/Toast";
import Navbar from "../components/Navbar";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm)
      return errorToast("Please fill all fields");
    if (password !== confirm)
      return errorToast("Passwords do not match");
    setBusy(true);
    try {
      await API.post("/api/auth/register", { name, email, password });
      successToast("Account created. Please log in.");
      navigate("/login");
    } catch (err) {
      const msg = err?.response?.data?.message || "Signup failed";
      errorToast(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-page">
        <div className="signup-card">
          <h2 className="signup-title">Create Account</h2>

          <form onSubmit={handleSubmit} className="signup-form">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />

            <label className="form-label">Email</label>
            <input
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />

            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose password"
            />

            <label className="form-label">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
            />

            <button
              type="submit"
              disabled={busy}
              className="btn-primary"
              style={{ opacity: busy ? 0.7 : 1 }}
            >
              {busy ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="signup-prompt">
            Already have an account?{" "}
            <Link className="link-primary" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;