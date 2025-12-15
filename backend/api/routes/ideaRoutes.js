const express = require("express");
const { createIdea, getIdeas, updateIdea, deleteIdea, getIdeaById,likeWithId,getIdeasByUser, addComment} = require("../controllers/ideaController.js");   
const authMiddleware = require("../controllers/middleware/authMiddleware.js");
const router = express.Router();

router.get("/user/:id", authMiddleware,  getIdeasByUser);  
router.get("/", getIdeas);                             
router.get("/:id", authMiddleware, getIdeaById);         
router.post("/", authMiddleware, createIdea);
router.put("/:id", authMiddleware, updateIdea);
router.put("/like/:id", authMiddleware, likeWithId)
router.delete("/:id", authMiddleware, deleteIdea);
router.post("/:id/comment", authMiddleware, addComment);




module.exports = router;
