import express from 'express';

import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  addRemoveFriend,
  getUser,
  getUserFriends,
} from '../controllers/users.controller.js';

const router = express.Router();

router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
