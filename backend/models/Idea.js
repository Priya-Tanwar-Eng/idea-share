const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IdeaUser",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    likes: {
      type: Number,
      default: 0,
    },

    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Idea", ideaSchema);
