import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

// Get user
export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
});

// Get user friends
export const getUserFriends = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const friends = await Promise.all(
    user.friends.map((id) => {
      User.findById(id);
    })
  );

  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    }
  );

  res.status(200).json(formattedFriends);
});

// Add or remove friend
export const addRemoveFriend = asyncHandler(async (req, res) => {
  const { id, friendId } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const friend = await User.findById(friendId);

  if (!friend) {
    return res.status(404).json({ message: 'Friend not found' });
  }

  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== id);
  } else {
    user.friends.push(friendId);
    friend.friends.push(id);
  }

  await user.save();
  await friend.save();

  const friends = await Promise.all(
    user.friends.map((id) => {
      User.findById(id);
    })
  );

  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    }
  );

  res.status(200).json(formattedFriends);
});
