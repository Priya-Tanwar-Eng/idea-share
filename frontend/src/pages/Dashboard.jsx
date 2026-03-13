import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/fetchAPI";
import { successToast, errorToast } from "../utils/Toast";
import Sidebar from "../components/Sidebar";
import TrandingIdeas from "../components/TrandingIdeas";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";

/* ── Inline mobile SVG icons ── */
const AllIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor" />
    <rect x="14" y="3" width="7" height="7" rx="2" fill="currentColor" opacity="0.85" />
    <rect x="3" y="14" width="7" height="7" rx="2" fill="currentColor" opacity="0.7" />
    <rect x="14" y="14" width="7" height="7" rx="2" fill="currentColor" opacity="0.55" />
  </svg>
);
const MineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill="currentColor" />
    <path d="M4 20a8 8 0 0 1 16 0" fill="currentColor" opacity="0.9" />
  </svg>
);
const AddIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const TrendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="16 7 22 7 22 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [value, setValue] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>;
  if (!user) return <p style={{ textAlign: "center", marginTop: "20px" }}>Please log in to view your dashboard.</p>;

  const loadIdeas = async () => {
    try {
      if (!user?.token) return;
      const url = value === "myIdea" ? `/api/ideas/user/${user.id}` : "/api/ideas";
      const res = await API.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      setIdeas(res?.data || []);
    } catch (err) {
      console.error(err);
      errorToast("Failed to load ideas");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!user?.token) return;
      await API.delete(`/api/ideas/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      successToast("Idea deleted");
      loadIdeas();
    } catch (err) {
      console.error(err);
      errorToast("Could not delete idea");
    }
  };

  const patchIdea = (id, patchOrUpdater) => {
    setIdeas((prev) =>
      prev.map((it) =>
        it._id === id
          ? typeof patchOrUpdater === "function"
            ? patchOrUpdater(it)
            : { ...it, ...patchOrUpdater }
          : it
      )
    );
  };

  useEffect(() => { loadIdeas(); }, [value]);

  useEffect(() => {
    if (location?.state?.value) setValue(location.state.value);
  }, [location?.state]);

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        {/* ── LEFT SIDEBAR ── */}
        <div className="dashboard-left">
          <Sidebar setValue={setValue} value={value} />
        </div>

        {/* ── CENTER FEED ── */}
        <div className="dashboard-feed">
          <Cards ideas={ideas} handleDelete={handleDelete} onPatchIdea={patchIdea} />
        </div>

        {/* ── RIGHT TRENDING PANEL ── */}
        <div className="dashboard-right">
          <TrandingIdeas ideas={ideas} />
        </div>
      </div>

      {/* ── TRENDING DRAWER (tablet/mobile) ── */}
      <div
        className={`drawer-overlay${drawerOpen ? " open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />
      <div className={`drawer${drawerOpen ? " open" : ""}`}>
        <div className="drawer-handle" />
        <TrandingIdeas ideas={ideas} />
      </div>

      {/* ── BOTTOM MOBILE NAV ── */}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <ul>
          <li className={value === "" ? "active" : ""} onClick={() => setValue("")}>
            <AllIcon />
            All
          </li>
          <li className={value === "myIdea" ? "active" : ""} onClick={() => setValue("myIdea")}>
            <MineIcon />
            Mine
          </li>
          <li onClick={() => navigate("/add")}>
            <AddIcon />
            Add
          </li>
          <li onClick={() => setDrawerOpen(true)}>
            <TrendIcon />
            Trending
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Dashboard;