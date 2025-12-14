import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/fetchAPI";
import { AuthContext } from "../context/AuthContext";
import { successToast, errorToast } from "../utils/Toast";
import Navbar from "../components/Navbar";

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
      const res = await API.post("/auth/register", { name, email, password });
      // After successful signup, redirect to login (no auto-login)
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
      <div
        style={{
          width: "100%",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#e3f2fd,#bbdefb)",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              fontSize: "28px",
              fontWeight: "600",
              color: "#0d47a1",
            }}
          >
            Create Account
          </h2>

          <form onSubmit={handleSubmit}>
            <label style={{ fontWeight: "500" }}>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={inputStyle}
            />

            <label style={{ fontWeight: "500" }}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              style={inputStyle}
            />

            <label style={{ fontWeight: "500" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose password"
              style={inputStyle}
            />

            <label style={{ fontWeight: "500" }}>Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={busy}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                border: "none",
                background: "#0d47a1",
                color: "white",
                fontSize: "16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                opacity: busy ? 0.7 : 1,
              }}
            >
              {busy ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "15px" }}>
            Already have an account?{" "}
            <Link style={{ color: "#0d47a1", fontWeight: "600" }} to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "6px 0 12px 0",
  borderRadius: "6px",
  border: "1px solid #bdbdbd",
  fontSize: "15px",
};

export default Signup;
