import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/fetchAPI";
import { successToast, errorToast } from "../utils/Toast";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AddIdea.css";

function AddIdea() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !desc || !category) {
      return errorToast("Please fill all required fields");
    }

    setIsSubmitting(true);
    try {
      await API.post(
        "/api/ideas",
        { title, desc, tags, category },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      successToast("Idea added successfully!");
      // small success indicator
      setShowSuccess(true);

      // short delay to show success animation, then navigate
      setTimeout(() => {
        // navigate to dashboard and request the "My Ideas" filter
        navigate("/dashboard", { state: { value: "myIdea" } });
      }, 700);
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Failed to add idea";
      errorToast(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="add-page">
        <div className={`add-card ${isSubmitting ? "submitting" : ""}`}>
          <h2 className="add-title">Add New Idea</h2>

          <form className="add-form" onSubmit={handleSubmit}>
            <div className="row">
              <label>
                <span className="label-text">Idea Title</span>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter idea title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isSubmitting}
                />
              </label>

              <label>
                <span className="label-text">Category</span>
                <select
                  className="input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="">Select Category</option>
                  <option value="Tech">Tech</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Business">Business</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Social">Social</option>
                </select>
              </label>
            </div>

            <label className="full">
              <span className="label-text">Description</span>
              <textarea
                className="textarea"
                placeholder="Enter detailed description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                disabled={isSubmitting}
              />
            </label>

            <label className="full">
              <span className="label-text">Tags (Press Enter)</span>

              <div className="tags-row">
                {tags.map((tag, index) => (
                  <div className="tag-chip" key={index}>
                    #{tag}
                    <button
                      type="button"
                      className="tag-remove"
                      onClick={() => removeTag(tag)}
                      aria-label={`Remove ${tag}`}
                    >
                      ✖
                    </button>
                  </div>
                ))}

                <input
                  className="tag-input"
                  type="text"
                  placeholder="Type and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  disabled={isSubmitting}
                />
              </div>
            </label>

            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" aria-hidden></span>
                  <span>Submitting...</span>
                </>
              ) : (
                "Submit Idea"
              )}
            </button>
          </form>

          <div className={`success-badge ${showSuccess ? "show" : ""}`} aria-hidden>
            <svg className="check" viewBox="0 0 24 24" width="48" height="48" fill="none">
              <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" opacity="0.14" />
              <path d="M6 12.3l3 3 7-7" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AddIdea;
