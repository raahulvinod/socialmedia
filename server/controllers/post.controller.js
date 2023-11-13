import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import Post from '../models/post.model.js';

// Create post
export const createPost = asyncHandler(async (req, res) => {
  const { userId, description, picturePath } = req.body;

  if (!userId || !description || !picturePath) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const newPost = new Post({
    userId,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    description,
    userPicturePath: user.picturePath,
    picturePath,
    likes: {},
    comments: [],
  });
  await newPost.save();

  const post = await Post.find();
  res.status(201).json(post);
});

// Get feeds
export const getFeedPosts = asyncHandler(async (req, res) => {
  const post = await Post.find();

  if (post.length === 0) {
    return res.status(404).json({ message: 'No posts found.' });
  }

  res.status(200).json(post);
});

// Get user posts
export const getUserPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'UserId required' });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userPosts = await Post.find({ userId });

  if (userPosts.length === 0) {
    return res.status(404).json({ message: 'No posts found for the user.' });
  }

  res.status(200).json(userPosts);
});

// Like posts
export const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!id || !userId) {
    return res.status(400).json({ message: 'Invalid or missing parameters' });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const isLiked = post.likes.get(userId);

  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { likes: post.likes },
    { new: true }
  );

  res.status(200).json(updatedPost);
});
