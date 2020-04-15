import {RequestHandler} from 'express';
import jwt from 'jsonwebtoken';

import {failureResponse} from '../utils/httpResponse';

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json(
      failureResponse({
        message: 'Authentication failed.',
      })
    );
  }
};
