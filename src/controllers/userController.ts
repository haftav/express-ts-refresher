import {Request, Response} from 'express';

import {createUser, deleteUser, getUsers, verifyUser} from '../services/user.service';
import {failureResponse, successResponse} from '../utils/httpResponse';

export default {
  createUser: async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const newUser = await createUser({username, password});

    if (!newUser) {
      return res.status(409).json(
        failureResponse({
          message: 'User exists',
        })
      );
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
      return res.status(401).json(
        failureResponse({
          message: 'Authentication failed.',
        })
      );
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
      return res.status(404).json(
        failureResponse({
          message: 'Not found.',
        })
      );
    }

    return res.status(200).json(
      successResponse({
        message: 'User deleted',
      })
    );
  },
};
