import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from '../controllers/post.controller.js';

const router = express.Router();

router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);
router.patch('/:id/like', verifyToken, likePost);

export default router;
