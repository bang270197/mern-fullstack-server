const express = require("express");

const { getPosts, createPost, updatePost } = require("../controllers/posts.js");
const router = express.Router();
//http://localhost:5000/posts

router.get("/", getPosts);

router.post("/", createPost);

router.post("/update", updatePost);

module.exports = router;
