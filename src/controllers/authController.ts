import {RequestHandler} from 'express';
import jwt from 'jsonwebtoken';

import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';
import {createJWT} from '../utils/auth';
import * as HttpError from '../utils/httpError';
import {createUserResponse, successResponse} from '../utils/httpResponse';

interface DecodedToken {
  id: number;
  username: string;
}

export const login: RequestHandler = async (req, res) => {
  // may want to check table for blacklisted users before continuing
  const {username, password} = req.body;
  // need to sanitize input here

  const user = await authService.verifyUser({username, password});

  if (!user) {
    throw new HttpError.AuthenticationError();
  }

  res.status(200).json(
    successResponse({
      user: createUserResponse(user),
      message: 'Auth Successful!',
    })
  );
};

// NOTE -> not currently in use
export const requestToken: RequestHandler = async (req, res) => {
  // read refresh_token cookie
  // if valid, send back new JWT

  const refreshToken = req.cookies?.['refresh_token'];

  if (!refreshToken) {
    throw new HttpError.NotFoundError();
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

  const user = await userService.getUser((decoded as DecodedToken).id);

  if (!user) {
    throw new HttpError.NotFoundError();
  }

  const token = createJWT(user);

  const jwtTokenExpiry = new Date(new Date().getTime() + 2 * 60 * 1000);

  res.status(200).json(
    successResponse({
      accessToken: token,
      refreshToken,
      jwtTokenExpiry,
      user: createUserResponse(user),
      message: 'Auth Successful!',
    })
  );
};
