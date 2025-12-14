const Idea = require("../models/Idea.js");  

const createIdea  = async (req, res) => {
  try {
    const { title, desc, tags } = req.body;

    const newIdea = await Idea.create({
      user: req.userId, 
      title,
      desc,
      tags,
    });

    res.status(201).json({
      message: "Idea Added Successfully",
      idea: newIdea,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().populate("user", "name email");
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea Not Found" });

    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


 const updateIdea = async (req, res) => {
  try {
    const { title, desc, tags } = req.body;

    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      { title, desc, tags },
      { new: true }
    );

    if (!updatedIdea)
      return res.status(404).json({ message: "Idea Not Found" });

    res.json({
      message: "Idea Updated Successfully",
      idea: updatedIdea,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const deleteIdea = async (req, res) => {
  try {
    const deletedIdea = await Idea.findByIdAndDelete(req.params.id);

    if (!deletedIdea)
      return res.status(404).json({ message: "Idea Not Found" });

    res.json({ message: "Idea Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


const likeWithId = async (req, res) => {
  try {
    const userId = req.userId;
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: "Idea Not Found" });
    }

    if (idea.likedBy.includes(userId)) {
      idea.likes -= 1;
      idea.likedBy = idea.likedBy.filter((id) => id.toString() !== userId);
      await idea.save();

      // populate before returning so front-end receives names and consistent structure
      await idea.populate("user", "name email");
      await idea.populate("comments.user", "name");
      return res.json({ message: "Idea Unliked Successfully", idea });
    } else {
      idea.likes += 1;
      idea.likedBy.push(userId);
      await idea.save();

      await idea.populate("user", "name email");
      await idea.populate("comments.user", "name");
      return res.json({ message: "Idea Liked Successfully", idea });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const addComment = async (req, res) => {
  try {
    const ideaId = req.params.id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    idea.comments.push({
      user: req.userId,
      text,
    });

    await idea.save();

    // populate comment user so frontend receives comment author name
    await idea.populate("comments.user", "name");
    return res.status(200).json({
      message: "Comment added successfully",
      comments: idea.comments,
      idea,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getIdeasByUser = async (req, res) => {
  try {
    const ideas = await Idea.find({ user: req.params.id }).populate("user", "name email");

    if (!ideas.length) {
      return res.status(404).json({ message: "No ideas found for this user" });
    }

    res.status(200).json(ideas);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// const addComment = async (req, res) => {
//   try {
//     const ideaId = req.params.id;
//     const { text } = req.body;

//     if (!text) {
//       return res.status(400).json({ message: "Comment cannot be empty" });
//     }

//     const idea = await Idea.findById(ideaId);
//     if (!idea) {
//       return res.status(404).json({ message: "Idea not found" });
//     }

//     idea.comments.push({
//       user: req.userId,
//       text,
//     });

//     await idea.save();

//     res.status(200).json({
//       message: "Comment added successfully",
//       comments: idea.comments,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


module.exports = { createIdea, getIdeas, getIdeaById, updateIdea, deleteIdea, likeWithId, getIdeasByUser,addComment };