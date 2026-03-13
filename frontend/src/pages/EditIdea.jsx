import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/fetchAPI";
import { AuthContext } from "../context/AuthContext";
import { successToast, errorToast } from "../utils/Toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./EditIdea.css";

function EditIdea() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const res = await API.get(`/api/ideas/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const idea = res.data;
        setTitle(idea.title);
        setDesc(idea.desc);
        setCategory(idea.category);
        if (Array.isArray(idea.tags)) {
          setTags(idea.tags);
        } else if (typeof idea.tags === "string") {
          setTags(idea.tags.split(",").map((t) => t.trim()));
        }
      } catch (err) {
        console.error(err);
        errorToast("Idea not found");
      }
    };
    fetchIdea();
  }, []);

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

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !category) return errorToast("Please fill all required fields");
    setIsSubmitting(true);
    try {
      await API.put(
        `/api/ideas/${id}`,
        { title, desc, tags, category },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      successToast("Idea Updated!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      errorToast("Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="edit-page">
        <div className="edit-card">
          <h2 className="edit-title">Edit Your Idea</h2>

          <form className="edit-form" onSubmit={handleSubmit}>
            <div className="edit-row">
              <label>
                <span className="label-text">Title</span>
                <input
                  className="input"
                  type="text"
                  value={title}
                  placeholder="Update your title..."
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
                value={desc}
                placeholder="Update your idea description..."
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
                  value={tagInput}
                  placeholder="Type and press Enter"
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  disabled={isSubmitting}
                />
              </div>
            </label>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Idea"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default EditIdea;