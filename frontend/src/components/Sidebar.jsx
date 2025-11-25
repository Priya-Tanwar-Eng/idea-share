import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({setValue}) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("ideaShare_auth");
    navigate("/login");
  };
  return (
    <>
      <aside
        style={{
          width: "20%",
          height: "100vh",
          backgroundColor: "#dbeafe", 
          padding: "20px",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          borderRadius: "0 12px 12px 0",
          position: "fixed",
          left: 0,
          top: 0,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "30px",
            color: "#1e3a8a",
          }}
        >
          IdeaShare
        </h2>

        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {/* ALL ITEMS */}
            <li
              style={{
                padding: "12px 15px",
                marginBottom: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "500",
                color: "#1e40af",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#bfdbfe")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
                   onClick={()=>{setValue("")}}
            >
              All Ideas
            </li>

            <li
              style={{
                padding: "12px 15px",
                marginBottom: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "500",
                color: "#1e40af",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#bfdbfe")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
              onClick={()=>{setValue("myIdea")} }
            >
              My Ideas
            </li>

            <li
              style={{
                padding: "12px 15px",
                marginBottom: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "500",
                color: "#1e40af",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#bfdbfe")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
              onClick={()=>navigate("/add")}
            >
              Add New
            </li>

            <li
              style={{
                padding: "12px 15px",
                marginBottom: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "500",
                color: "#1e40af",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#bfdbfe")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              Profile
            </li>

            <li
              onClick={handleLogout}
              style={{
                padding: "12px 15px",
                marginTop: "20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
                color: "#dc2626",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#fecaca")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              Logout
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
