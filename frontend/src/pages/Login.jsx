import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/fetchAPI";
import { AuthContext } from "../context/AuthContext";
import { successToast, errorToast } from "../utils/Toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          padding: "40px 60px",
          minHeight: "80vh",
          background: "#f5f7fa",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #6ec6ff, #0066ff)",
            borderRadius: "20px",
            marginRight: "35px",
            display: "flex",
            alignItems: "center",
            padding: "50px",
            color: "white",
          }}
        >
          <h1 style={{ fontSize: "38px", fontWeight: "700", lineHeight: "1.3" }}>
            Every big idea starts <br /> with a small step.
          </h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "45px",
            borderRadius: "14px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
            border: "1px solid #eee",
            height: "fit-content",
          }}
        >
          <h2
            style={{
              marginBottom: "25px",
              textAlign: "center",
              fontWeight: "700",
              fontSize: "28px",
              color: "#222",
            }}
          >
            Login
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              style={inputStyle}
            />

            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={busy}
              style={{
                padding: "14px",
                marginTop: "10px",
                background: "#0066ff",
                color: "white",
                fontSize: "17px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {busy ? "Logging in..." : "Login"}
            </button>
          </form>

          <p style={{ marginTop: "18px", textAlign: "center", fontSize: "15px" }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "#0066ff", fontWeight: "600" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

const labelStyle = {
  marginBottom: "6px",
  fontSize: "15px",
  fontWeight: "600",
  color: "#333",
};

const inputStyle = {
  padding: "12px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  outline: "none",
};

export default Login;
