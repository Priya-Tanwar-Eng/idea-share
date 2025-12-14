import React, { useMemo } from "react";

const TrandingIdeas = ({ ideas }) => {
 const mostLikedIdeas = useMemo(() => {
  return [...ideas]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 3);
}, [ideas]);


  const topContributors = useMemo(() => {
    const map = {};

    ideas.forEach((idea) => {
      if (idea.user && idea.user.name) {
        map[idea.user.name] = (map[idea.user.name] || 0) + 1;
      }
    });

    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [ideas]);

  return (
    <aside
      style={{
        width: "20%",
        backgroundColor: "#f8fafc",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: "100vh",
        position: "fixed",
        right: 0,
        top: 0,
        overflowY: "auto",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "700",
          marginBottom: "20px",
          color: "#1e3a8a",
        }}
      >
        Trending Ideas
      </h2>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "25px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h3
          style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}
        >
          Most Liked
        </h3>

        {mostLikedIdeas.length === 0 ? (
          <p style={{ fontSize: "15px", color: "#6b7280" }}>
            No ideas available
          </p>
        ) : (
          <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
            {mostLikedIdeas.map((item) => (
              <li
                key={item._id}
                style={{
                  marginBottom: "10px",
                  fontSize: "16px",
                  color: "#374151",
                }}
              >
                {item.title} • {item.likes || 0} Likes
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div
        style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h3
          style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}
        >
          Top Contributors
        </h3>

        {topContributors.length === 0 ? (
          <p style={{ fontSize: "15px", color: "#6b7280" }}>
            No contributors yet
          </p>
        ) : (
          <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
            {topContributors.map((c, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  fontSize: "16px",
                  color: "#1e40af",
                  fontWeight: "500",
                }}
              >
                {c.name} • {c.count} Ideas
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default TrandingIdeas;
