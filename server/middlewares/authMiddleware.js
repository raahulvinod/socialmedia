import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const veryfyToken = asyncHandler(async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      res.status(403);
      throw new Error('Access Denied, Not Authorized');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimStart();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (error) {
    res.status(403);
    throw new Error('Access Denied, Token Failed');
  }
});
