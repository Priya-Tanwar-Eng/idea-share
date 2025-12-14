import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/fetchAPI";
import { AuthContext } from "../context/AuthContext";
import { successToast, errorToast } from "../utils/Toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EditIdea() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");

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

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#f5f7fa",
          minHeight: "100vh",
          padding: "40px 0",
        }}
      >
        <div style={{ width: "55%", margin: "auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "700",
              marginBottom: "25px",
              color: "#222",
            }}
          >
            Edit Your Idea
          </h2>

          <div
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #eee",
            }}
          >
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
            
              <label style={labelStyle}>Title</label>
              <input
                type="text"
                value={title}
                placeholder="Update your title..."
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
              />

              <label style={labelStyle}>Description</label>
              <textarea
                value={desc}
                placeholder="Update your idea description..."
                onChange={(e) => setDesc(e.target.value)}
                style={textareaStyle}
              ></textarea>

              <label style={labelStyle}>Tags</label>

              <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "10px" }}>
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      background: "#eef",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      marginRight: "8px",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                      border: "1px solid #ccd",
                    }}
                  >
                    #{tag}
                    <span
                      onClick={() => removeTag(tag)}
                      style={{
                        marginLeft: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      ✖
                    </span>
                  </div>
                ))}
              </div>

              <input
                type="text"
                value={tagInput}
                placeholder="Type and press Enter"
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                style={inputStyle}
              />

              <label style={labelStyle}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  ...inputStyle,
                  height: "45px",
                  cursor: "pointer",
                }}
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Business">Business</option>
                <option value="Health">Health</option>
                <option value="Social">Social</option>
                <option value="Other">Other</option>
              </select>

              <button
                type="submit"
                style={{
                  padding: "12px 20px",
                  width: "100%",
                  background: "#222",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Update Idea
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const labelStyle = {
  fontWeight: "600",
  fontSize: "15px",
  marginBottom: "6px",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginBottom: "20px",
  fontSize: "15px",
  outline: "none",
};

const textareaStyle = {
  width: "100%",
  height: "140px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginBottom: "25px",
  fontSize: "15px",
  outline: "none",
  resize: "none",
};

export default EditIdea;
