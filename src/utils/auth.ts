import jwt from 'jsonwebtoken';

import User from '../models/User';

export const createRefreshToken = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.REFRESH_SECRET
  );
  return token;
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
    }
  );

  return token;
};
