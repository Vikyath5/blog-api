require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./src/models/User");
const Post = require("./src/models/Post");
const Comment = require("./src/models/Comment");

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Clear existing data
        await Comment.deleteMany({});
        await Post.deleteMany({});
        await User.deleteMany({});

        // Create users
        const password = await bcrypt.hash("password123", 10);

        const users = await User.insertMany([
            {
                name: "John Doe",
                email: "john@example.com",
                password
            },
            {
                name: "Jane Doe",
                email: "jane@example.com",
                password
            }
        ]);

        // Create posts
        const posts = await Post.insertMany([
            {
                title: "Getting Started with Node.js",
                content: "Node.js is a JavaScript runtime used for building backend applications.",
                author: users[0]._id
            },
            {
                title: "Understanding REST APIs",
                content: "REST APIs allow applications to communicate using HTTP methods.",
                author: users[1]._id
            }
        ]);

        // Create comments
        await Comment.insertMany([
            {
                content: "Great explanation!",
                author: users[1]._id,
                post: posts[0]._id
            },
            {
                content: "Very useful post.",
                author: users[0]._id,
                post: posts[1]._id
            }
        ]);

        console.log("Database seeded successfully");

        await mongoose.connection.close();

    } catch (error) {
        console.error("Seeding failed:", error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

seedDatabase();