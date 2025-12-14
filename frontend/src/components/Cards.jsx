import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/fetchAPI";
import "./Cards.css";
import { successToast, errorToast } from "../utils/Toast";

const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
};

const Cards = ({ ideas, handleDelete,onPatchIdea = () => {} }) => {
  const [commentTextMap, setCommentTextMap] = useState({});
  const [showComments, setShowComments] = useState({});
  const { user } = useContext(AuthContext);

  const setCommentText = (id, text) =>
    setCommentTextMap((p) => ({ ...p, [id]: text }));

  const toggleComments = (id) =>
    setShowComments((p) => ({ ...p, [id]: !p[id] }));

 const handleLikes = async (id) => {
  if (!onPatchIdea) return;

  // Optimistic toggle: compute if currently liked
  onPatchIdea(id, (prev) => {
    const liked = (prev.likedBy || []).some((x) => x?.toString() === user.id);
    if (liked) {
      return {
        ...prev,
        likes: Math.max(0, (prev.likes || 0) - 1),
        likedBy: (prev.likedBy || []).filter((x) => x?.toString() !== user.id),
      };
    } else {
      return {
        ...prev,
        likes: (prev.likes || 0) + 1,
        likedBy: [...(prev.likedBy || []), user.id],
      };
    }
  });

  try {
    const res = await API.put(`/ideas/like/${id}`, {}, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const updated = res?.data?.idea;
    if (updated) {
      // Reconcile with server response (authoritative)
      onPatchIdea(id, { likes: updated.likes, likedBy: updated.likedBy });
    }
  } catch (err) {
    // Rollback by toggling back (simple rollback)
    onPatchIdea(id, (prev) => {
      const liked = (prev.likedBy || []).some((x) => x?.toString() === user.id);
      // reverse optimistic change
      if (liked) {
        return {
          ...prev,
          likes: Math.max(0, (prev.likes || 0) - 1),
          likedBy: (prev.likedBy || []).filter((x) => x?.toString() !== user.id),
        };
      } else {
        return {
          ...prev,
          likes: (prev.likes || 0) + 1,
          likedBy: [...(prev.likedBy || []), user.id],
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

  // Save snapshot for rollback
  const currentIdea = ideas.find((it) => it._id === id);
  const prevComments = currentIdea ? [...(currentIdea.comments || [])] : [];

  // Optimistic append
  const newComment = {
    user: { name: user.name, _id: user.id },
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
    const res = await API.post(`/ideas/${id}/comment`, { text }, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    // If server returned comments/idea, reconcile
    const serverComments = res?.data?.comments;
    if (serverComments) {
      onPatchIdea(id, { comments: serverComments });
    }
    successToast("Comment added");
  } catch (err) {
    // rollback to prev comments
    onPatchIdea(id, { comments: prevComments });
    setCommentTextMap((p) => ({ ...p, [id]: text }));
    errorToast("Could not add comment");
    console.error(err);
  }
};

const isLiked = (idea) => (idea.likedBy || []).some((x) => x?.toString() === user.id);
  return (
    <div className="cards-wrap" style={{ fontFamily: "Poppins, sans-serif" }}>
      {ideas.length === 0 ? (
        <div className="empty-state">
          <h3>No ideas yet</h3>
          <p>Be the first to add an idea — click Add Idea ✨</p>
        </div>
      ) : (
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
                <button
  className={`like-btn ${isLiked(idea) ? "liked" : ""}`}
  onClick={() => handleLikes(idea._id)}
  aria-label={`Like ${idea.title}`}
>
  <span className="like-count">{idea.likes || 0}</span> Like
</button>
                </div>
              </header>

              <h3 id={`title-${idea._id}`} className="card-title">
                {idea.title}
              </h3>

              <p className="card-desc">{idea.desc}</p>

              <div className="tags">
                {idea.tags.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="card-actions">
                <button
                  className="btn btn-ghost"
                  onClick={() => toggleComments(idea._id)}
                >
                  Comments ({idea.comments.length || 0})
                </button>

                {idea.user._id === user.id && (
                  <>
                    <Link className="btn btn-edit" to={`/edit/${idea._id}`}>
                      Edit
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(idea._id)}
                    >
                      Delete
                    </button>
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
                  />
                  <button onClick={() => handleComment(idea._id)} className="btn btn-primary">
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
