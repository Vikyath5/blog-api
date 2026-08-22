const Comment = require("../models/Comment");
const Post = require("../models/Post");

const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { postId } = req.params;

        // Check content
        if (!content) {
            return res.status(400).json({
                message: "Comment content is required"
            });
        }

        // Check if the post exists
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // Create comment
        const comment = await Comment.create({
            content,
            author: req.user.userId,
            post: postId
        });

        res.status(201).json({
            message: "Comment created successfully",
            comment
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const getComments = async (req, res) => {
    try {
        const { postId } = req.params;

        // Check if the post exists
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // Get comments for this post
        const comments = await Comment.find({ post: postId })
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            comments
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        // Check content
        if (!content) {
            return res.status(400).json({
                message: "Comment content is required"
            });
        }

        // Find comment
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        // Check if the logged-in user is the author
        if (comment.author.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You can only update your own comments"
            });
        }

        // Update comment
        comment.content = content;
        await comment.save();

        res.status(200).json({
            message: "Comment updated successfully",
            comment
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        // Find comment
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        // Check if the logged-in user is the author
        if (comment.author.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You can only delete your own comments"
            });
        }

        // Delete comment
        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment
};