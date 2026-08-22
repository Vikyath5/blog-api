const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const {
    updateComment,
    deleteComment
} = require("./controllers/commentController");
const protect = require("./middleware/authMiddleware");
const userRoutes = require("./routes/userRoutes");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/posts", commentRoutes);
app.put("/comments/:commentId", protect, updateComment);
app.delete("/comments/:commentId", protect, deleteComment);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Blog API is running"
    });
});

app.get("/protected", protect, (req, res) => {
    res.json({
        message: "You accessed a protected route",
        user: req.user
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});