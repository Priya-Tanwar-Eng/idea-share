import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/fetchAPI";
import { successToast, errorToast } from "../utils/Toast";
import Sidebar from "../components/Sidebar";
import TrandingIdeas from "../components/TrandingIdeas";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom"; // 🔧 new

function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [value, setValue] = useState("");
  const location = useLocation(); // 🔧 new
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>;
  }

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Please log in to view your dashboard.
      </p>
    );
  }

  const loadIdeas = async () => {
    try {
      if (!user?.token) return;
      if (value === "myIdea") {
         const res = await API.get(`/api/ideas/user/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setIdeas(res?.data || []);
      } else {
        const res = await API.get("/api/ideas", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setIdeas(res?.data || []);
      }
    } catch (err) {
      console.error(err);
      errorToast("Failed to load ideas");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!user?.token) return;

      await API.delete(`/api/ideas/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      successToast("Idea deleted");
      loadIdeas();
    } catch (err) {
      console.error(err);
      errorToast("Could not delete idea");
    }
  };

  useEffect(() => {
    loadIdeas();
  }, [value]);

  // If navigated here with state (e.g., { value: 'myIdea' }), apply it
  useEffect(() => {
    if (location?.state?.value) {
      setValue(location.state.value);
    }
  }, [location?.state]);

  const patchIdea = (id, patchOrUpdater) => {
   setIdeas((prev) =>
    prev.map((it) =>
       it._id === id
         ? (typeof patchOrUpdater === "function"
             ? patchOrUpdater(it)
             : { ...it, ...patchOrUpdater })
         : it
     )
   );
  };
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "20% 60% 20%",
          backgroundColor: "#f1f5f9",
          height: "calc(100vh - 120px)",
          padding: "20px 30px",
          overflow: "hidden", 
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "80px",
            height: "80vh",
            overflow: "hidden",
          }}
        >
          <Sidebar setValue={setValue} value={value}/>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            // borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflowY: "auto",
            height: "100%",
          }}
        >
          <Cards ideas={ideas} handleDelete={handleDelete} onPatchIdea={patchIdea}/>
        </div>

        <div
          style={{
            position: "sticky",
            top: "80px",
            height: "80vh",
            overflow: "hidden",
          }}
        >
          <TrandingIdeas ideas={ideas} />
        </div>
      </div>

      {/* <div style={{ position: "sticky", bottom: 0, zIndex: 50 }}>
        <Footer />
      </div> */}
    </>
  );
}

export default Dashboard;
