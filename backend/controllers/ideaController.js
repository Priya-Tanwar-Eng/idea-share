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

    console.log(idea)
    if (idea.likedBy.includes(userId)) {
      
      idea.likes -= 1;
      idea.likedBy = idea.likedBy.filter(id => id !== userId);

      await idea.save();

      return res.json({
        message: "Idea Unliked Successfully",
        idea,
      });
    } 
    
    else {
      
      idea.likes += 1;
      idea.likedBy.push(userId);

      await idea.save();

      return res.json({
        message: "Idea Liked Successfully",
        idea,
      });
    }

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
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



module.exports = { createIdea, getIdeas, getIdeaById, updateIdea, deleteIdea, likeWithId, getIdeasByUser };