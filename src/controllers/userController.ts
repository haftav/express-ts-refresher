import {NextFunction, Request, Response} from 'express';

import {createUser, deleteUser, getUser, getUsers, verifyUser} from '../services/user.service';
import {createJWT} from '../utils/auth';
import * as HttpError from '../utils/httpError';
import {createUserResponse, successResponse} from '../utils/httpResponse';

export default {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body;
    // sanitize input here
    const newUser = await createUser({username, password});

    if (!newUser) {
      next(new HttpError.ConflictError('User exists.'));
      return;
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
    const {id} = req.params;
    const userId = req.userData.id;

    if (parseInt(id, 10) !== userId) {
      throw new HttpError.AuthenticationError();
    }

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

    const user = await getUser(userId);

    if (!user) {
      throw new HttpError.NotFoundError();
    }

    return res.status(200).json(
      successResponse({
        user: createUserResponse(user),
      })
    );
  },
};
