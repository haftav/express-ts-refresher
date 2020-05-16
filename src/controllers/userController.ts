import {Request, Response} from 'express';

import {createUser, deleteUser, getUser, getUsers, verifyUser} from '../services/user.service';
import {createJWT, createRefreshToken} from '../utils/auth';
import * as HttpError from '../utils/httpError';
import {createUserResponse, successResponse} from '../utils/httpResponse';

export default {
  createUser: async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const newUser = await createUser({username, password});

    if (!newUser) {
      throw new HttpError.ConflictError('User exists.');
    }

    return res.status(201).json(
      successResponse({
        user: createUserResponse(newUser),
      })
    );
  },
  loginUser: async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const user = await verifyUser({username, password});

    if (!user) {
      throw new HttpError.AuthenticationError();
    }

    const token = createJWT(user);
    const refreshToken = createRefreshToken(user);

    // should update this to set refresh token in cookie in future
    res.cookie('refresh_token', refreshToken, {
      domain: 'localhost',
      httpOnly: false,
    });

    res.status(200).json(
      successResponse({
        accessToken: token,
        user: createUserResponse(user),
        message: 'Auth Successful!',
      })
    );
  },
  getUsers: async (req: Request, res: Response) => {
    const users = await getUsers();

    const response = successResponse({
      users,
    });
    return res.status(200).json(response);
  },
  deleteUser: async (req: Request, res: Response) => {
    // currently anyone can delete a user. Need to fix this
    const {id} = req.params;
    const deletedUsers: number = await deleteUser({id});

    if (deletedUsers === 0) {
      throw new HttpError.NotFoundError();
    }

    return res.status(200).json(
      successResponse({
        message: 'User deleted',
      })
    );
  },
  getUser: async (req: Request, res: Response) => {
    const userId = req.userData.id;

    console.log(req.cookies);
    const user = await getUser(userId);

    if (!user) {
      return new HttpError.NotFoundError();
    }

    return res.status(200).json(
      successResponse({
        user: createUserResponse(user),
      })
    );
  },
};
