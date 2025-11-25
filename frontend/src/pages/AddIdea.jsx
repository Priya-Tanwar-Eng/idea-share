import { useState, useContext } from "react";
import API from "../utils/fetchAPI";
import { successToast, errorToast } from "../utils/Toast";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AddIdea() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");

  const { user } = useContext(AuthContext);

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

    try {
      await API.post(
        "/ideas",
        { title, desc, tags, category },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      successToast("Idea Added Successfully");

      setTitle("");
      setDesc("");
      setTags([]);
      setCategory("");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Failed to add idea";
      errorToast(msg);
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
              marginBottom: "20px",
              color: "#222",
            }}
          >
            Add New Idea
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #eee",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label style={labelStyle}>Idea Title</label>
            <input
              type="text"
              placeholder="Enter idea title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />

            <label style={labelStyle}>Description</label>
            <textarea
              placeholder="Enter detailed description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={textareaStyle}
            ></textarea>

            <label style={labelStyle}>Tags (Press Enter)</label>

            <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "10px" }}>
              {tags.map((tag, index) => (
                <div
                  key={index}
                  style={{
                    background: "#eef",
                    padding: "6px 10px",
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
                      fontWeight: "bold",
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
              placeholder="Type and press Enter"
              value={tagInput}
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
                height: "48px",
                cursor: "pointer",
              }}
            >
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Social">Social</option>
            </select>

            <button
              type="submit"
              style={{
                padding: "14px",
                width: "100%",
                background: "#222",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "17px",
                cursor: "pointer",
                fontWeight: "600",
                marginTop: "15px",
              }}
            >
              Submit Idea
            </button>
          </form>
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

export default AddIdea;
