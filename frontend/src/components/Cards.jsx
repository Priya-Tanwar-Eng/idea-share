import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Cards = ({ ideas, handleDelete }) => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: "30px", fontFamily: "Poppins, sans-serif" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px" }}>
        All Ideas
      </h2>

      {ideas.length === 0 ? (
        <p style={{ fontSize: "18px", color: "#666" }}>
          No ideas found. Add some!
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {ideas.map((idea) => (
            <div
              key={idea._id}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "14px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: "700" }}>
                {idea.user.name}
              </h3>

              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "10px 0",
                }}
              >
                {idea.title}
              </h3>

              <p style={{ fontSize: "16px", color: "#444" }}>{idea.desc}</p>

              <p style={{ marginBottom: "15px", marginTop: "5px" }}>
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: "#e0f2ff",
                      color: "#1e40af",
                      padding: "5px 12px",
                      margin: "2px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </p>

              <div style={{ display: "flex", gap: "10px" }}>

                <button
                  style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Like
                </button>

                <button
                  style={{
                    backgroundColor: "#6b7280",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Comment
                </button>

                {idea.user._id === user.id && (
                  <>
                    <Link
                      to={`/edit/${idea._id}`}
                      style={{
                        backgroundColor: "#facc15",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        color: "#000",
                        fontWeight: "600",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(idea._id)}
                      style={{
                        backgroundColor: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
