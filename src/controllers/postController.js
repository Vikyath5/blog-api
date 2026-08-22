const Post = require("../models/Post");

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Check required fields
        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        // Create post using the logged-in user's ID
        const post = await Post.create({
            title,
            content,
            author: req.user.userId
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            posts
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("author", "name email");

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            post
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // Only the author can update the post
        if (post.author.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not allowed to update this post"
            });
        }

        if (title) {
            post.title = title;
        }

        if (content) {
            post.content = content;
        }

        await post.save();

        res.status(200).json({
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // Only the author can delete the post
        if (post.author.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not allowed to delete this post"
            });
        }

        await post.deleteOne();

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
};