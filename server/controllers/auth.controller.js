import bcrypt, { compare } from 'bcrypt';
import asyncHandler from 'express-async-handler';

import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Register user
export const register = asyncHandler(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      res.status(400);
      throw new Error('User already exists. Please login');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Login user
export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new Error('User does not exists');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (error) {
    throw new Error(error);
  }
});
