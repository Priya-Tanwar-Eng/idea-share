import React, { useMemo } from "react";
import "./TrandingIdeas.css";

const TrandingIdeas = ({ ideas }) => {
  const mostLikedIdeas = useMemo(() => {
    return [...ideas]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 3);
  }, [ideas]);

  const topContributors = useMemo(() => {
    const map = {};
    ideas.forEach((idea) => {
      if (idea.user?.name) {
        map[idea.user.name] = (map[idea.user.name] || 0) + 1;
      }
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [ideas]);

  return (
    <aside className="trending-panel" aria-label="Trending">
      <h2 className="trending-title">Trending Ideas</h2>

      <div className="trending-card">
        <h3 className="trending-card-title">Most Liked</h3>
        {mostLikedIdeas.length === 0 ? (
          <p className="trending-empty">No ideas available</p>
        ) : (
          <ul className="trending-list">
            {mostLikedIdeas.map((item) => (
              <li key={item._id} className="trending-item">
                <span className="trending-item-title">{item.title}</span>
                <span className="trending-badge">{item.likes || 0} ♥</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="trending-card">
        <h3 className="trending-card-title">Top Contributors</h3>
        {topContributors.length === 0 ? (
          <p className="trending-empty">No contributors yet</p>
        ) : (
          <ul className="trending-list">
            {topContributors.map((c, index) => (
              <li key={index} className="trending-item">
                <span className="trending-contributor">{c.name}</span>
                <span className="trending-badge">{c.count} ideas</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default TrandingIdeas;