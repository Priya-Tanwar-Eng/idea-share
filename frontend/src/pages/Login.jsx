import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/fetchAPI";
import { AuthContext } from "../context/AuthContext";
import { successToast, errorToast } from "../utils/Toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return errorToast("Please fill all fields");

    setBusy(true);

    try {
      const res = await API.post("/api/auth/login", { email, password });
      const payload = { ...res.data.user, token: res.data.token };

      login(payload);
      successToast("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Login failed";
      errorToast(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-layout">
        <div className="login-hero" aria-hidden="true">
          <h1 className="hero-title">
            Every big idea starts <br /> with a small step.
          </h1>
        </div>

        <div className="login-card">
          <h2 className="card-title">Login</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="form-label">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="form-input"
            />

            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="form-input"
            />

            <button type="submit" disabled={busy} className="btn-primary">
              {busy ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="signup-prompt">
            Don’t have an account?{" "}
            <Link to="/signup" className="link-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
