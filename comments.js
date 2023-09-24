// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
// Parse body of request
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  // Get the comment from the request body
  const { content } = req.body;
  // Get the comments for the post
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment to the post
  comments.push({ id: commentId, content });
  // Save the comments for the post
  commentsByPostId[req.params.id] = comments;
  // Send the new comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});