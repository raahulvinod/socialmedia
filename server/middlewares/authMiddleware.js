import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

export const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(403).send('Access Denied, Not Authorized');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7).trimStart();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }

    res.status(500).json({ error: err.message });
  }
});
