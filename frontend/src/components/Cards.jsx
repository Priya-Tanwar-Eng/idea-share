import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/fetchAPI";
import "./Cards.css";
import { successToast, errorToast } from "../utils/Toast";

const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
};

// Mobile-safe button — works on both touch and mouse
const TapButton = ({ onClick, className, disabled, children, ...props }) => {
  const fired = React.useRef(false);

  const handleTouch = (e) => {
    e.preventDefault();
    if (fired.current) return;
    fired.current = true;
    onClick();
    setTimeout(() => { fired.current = false; }, 600);
  };

  const handleClick = (e) => {
    if (fired.current) return;
    fired.current = true;
    onClick();
    setTimeout(() => { fired.current = false; }, 600);
  };

  return (
    <button
      className={className}
      disabled={disabled}
      onTouchEnd={handleTouch}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Cards = ({ ideas, handleDelete, onPatchIdea = () => {}, filterValue = "" }) => {
  const [commentTextMap, setCommentTextMap] = useState({});
  const [showComments, setShowComments] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = user?.token;
  const userId = user?.id || user?._id || user?.user?.id || user?.user?._id;

  const setCommentText = (id, text) =>
    setCommentTextMap((p) => ({ ...p, [id]: text }));

  const toggleComments = (id) =>
    setShowComments((p) => ({ ...p, [id]: !p[id] }));

  const handleLikes = async (id) => {
    if (!onPatchIdea) return;

    onPatchIdea(id, (prev) => {
      const liked = (prev.likedBy || []).some((x) => x?.toString() === userId);
      if (liked) {
        return {
          ...prev,
          likes: Math.max(0, (prev.likes || 0) - 1),
          likedBy: (prev.likedBy || []).filter((x) => x?.toString() !== userId),
        };
      } else {
        return {
          ...prev,
          likes: (prev.likes || 0) + 1,
          likedBy: [...(prev.likedBy || []), userId],
        };
      }
    });

    try {
      const res = await API.put(`/api/ideas/like/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = res?.data?.idea;
      if (updated) {
        onPatchIdea(id, { likes: updated.likes, likedBy: updated.likedBy });
      }
    } catch (err) {
      onPatchIdea(id, (prev) => {
        const liked = (prev.likedBy || []).some((x) => x?.toString() === userId);
        if (liked) {
          return {
            ...prev,
            likes: Math.max(0, (prev.likes || 0) - 1),
            likedBy: (prev.likedBy || []).filter((x) => x?.toString() !== userId),
          };
        } else {
          return {
            ...prev,
            likes: (prev.likes || 0) + 1,
            likedBy: [...(prev.likedBy || []), userId],
          };
        }
      });
      console.error(err);
      errorToast("Could not update like. Please try again.");
    }
  };

  const handleComment = async (id) => {
    const text = (commentTextMap[id] || "").trim();
    if (!text) return errorToast("Comment cannot be empty");

    const currentIdea = ideas.find((it) => it._id === id);
    const prevComments = currentIdea ? [...(currentIdea.comments || [])] : [];

    const newComment = {
      user: { name: user.name, _id: userId },
      text,
      createdAt: new Date().toISOString(),
    };

    onPatchIdea(id, (prev) => ({
      ...prev,
      comments: [...(prev.comments || []), newComment],
    }));

    setCommentTextMap((p) => ({ ...p, [id]: "" }));
    setShowComments((p) => ({ ...p, [id]: true }));

    try {
      const res = await API.post(`/api/ideas/${id}/comment`, { text }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const serverComments = res?.data?.comments;
      if (serverComments) {
        onPatchIdea(id, { comments: serverComments });
      }
      successToast("Comment added");
    } catch (err) {
      onPatchIdea(id, { comments: prevComments });
      setCommentTextMap((p) => ({ ...p, [id]: text }));
      errorToast("Could not add comment");
      console.error(err);
    }
  };

  const isLiked = (idea) =>
    (idea.likedBy || []).some((x) => x?.toString() === userId);

  if (ideas.length === 0) {
    const isMyIdeas = filterValue === "myIdea";
    return (
      <div className="empty-state">
        <div className="empty-icon">{isMyIdeas ? "💡" : "🔍"}</div>
        <h3 className="empty-title">
          {isMyIdeas ? "Abhi tak koi idea nahi" : "Koi idea nahi mila"}
        </h3>
        <p className="empty-desc">
          {isMyIdeas
            ? "Aapne abhi tak koi idea share nahi kiya. Apna pehla idea add karein aur community ke saath share karein!"
            : "Abhi koi idea available nahi hai. Thodi der baad dobara try karein."}
        </p>
        {isMyIdeas && (
          <button className="empty-cta" onClick={() => navigate("/add")}>
            + Add Your First Idea
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="cards-wrap" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="cards-grid">
        {ideas.map((idea) => (
          <article className="card" key={idea._id} aria-labelledby={`title-${idea._id}`}>
            <header className="card-header">
              <div className="avatar">{getInitials(idea.user.name)}</div>

              <div className="meta">
                <div className="user-name">{idea.user.name}</div>
                <div className="time">
                  {new Date(idea.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>

              <div className="card-header-right">
                <TapButton
                  className={`like-btn ${isLiked(idea) ? "liked" : ""}`}
                  onClick={() => handleLikes(idea._id)}
                  aria-label={`Like ${idea.title}`}
                >
                  <span className="like-count">{idea.likes || 0}</span> Like
                </TapButton>
              </div>
            </header>

            <h3 id={`title-${idea._id}`} className="card-title">
              {idea.title}
            </h3>

            <p className="card-desc">{idea.desc}</p>

            <div className="tags">
              {idea.tags.map((tag) => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>

            <div className="card-actions">
              <TapButton
                className="btn btn-ghost"
                onClick={() => toggleComments(idea._id)}
              >
                Comments ({idea.comments.length || 0})
              </TapButton>

              {idea.user._id === userId && (
                <>
                  <Link className="btn btn-edit" to={`/edit/${idea._id}`}>
                    Edit
                  </Link>
                  <TapButton
                    className="btn btn-delete"
                    onClick={() => handleDelete(idea._id)}
                  >
                    Delete
                  </TapButton>
                </>
              )}
            </div>

            <div className={`comments-panel ${showComments[idea._id] ? "open" : ""}`}>
              <div className="comments-list">
                {idea.comments.length === 0 ? (
                  <div className="no-comments">No comments yet</div>
                ) : (
                  idea.comments.map((cmt, i) => (
                    <div className="comment" key={i}>
                      <strong>{cmt.user?.name || "User"}</strong>
                      <p>{cmt.text}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="comment-input">
                <input
                  value={commentTextMap[idea._id] || ""}
                  onChange={(e) => setCommentText(idea._id, e.target.value)}
                  placeholder="Add a comment..."
                  onKeyDown={(e) => { if (e.key === "Enter") handleComment(idea._id); }}
                />
                <TapButton
                  className="btn btn-primary"
                  onClick={() => handleComment(idea._id)}
                >
                  Add
                </TapButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Cards;