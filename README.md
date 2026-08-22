# Blog API

A RESTful Blog API built using Node.js, Express, MongoDB, Mongoose, and JWT authentication.

## Features

- User registration
- User login with JWT authentication
- Protected routes
- Posts CRUD operations
- Comments nested under posts
- Protected write operations
- MongoDB database using Mongoose
- Postman collection for API testing
- Deployed on Render

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Postman

## Project Structure

```text
blog-api/
├── src/
│   ├── controllers/
│   │   ├── commentController.js
│   │   ├── postController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Comment.js
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/
│   │   ├── commentRoutes.js
│   │   ├── postRoutes.js
│   │   └── userRoutes.js
│   ├── database.js
│   └── server.js
├── postman/
│   └── blog_api.postman_collection.json
├── seed.js
├── package.json
├── package-lock.json
└── .gitignoregit add README.md