import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const veryfyToken = asyncHandler(async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      res.status(401);
      throw new Error('Not Autherized, Access Denied');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimStart();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token fail');
  }
});
