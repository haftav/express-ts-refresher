import {Request, Response} from 'express';

import {createUser, deleteUser, getUsers, verifyUser} from '../services/user.service';
import * as HttpError from '../utils/httpError';
import {successResponse} from '../utils/httpResponse';

export default {
  createUser: async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const newUser = await createUser({username, password});

    if (!newUser) {
      throw new HttpError.ConflictError('User exists.');
    }

    return res.status(201).json(
      successResponse({
        user: newUser,
      })
    );
  },
  loginUser: async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const token = await verifyUser({username, password});

    if (!token) {
      throw new HttpError.AuthenticationError();
    }
    res.status(200).json(
      successResponse({
        token,
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
};
