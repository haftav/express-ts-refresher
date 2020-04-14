import {Request, Response} from 'express';

import {createUser, deleteUser, getUsers} from '../services/user.service';
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

    const response = successResponse({
      user: newUser,
    });

    res.status(201).json(response);
  },
  getUsers: async (req: Request, res: Response) => {
    const users = await getUsers();

    const response = successResponse({
      users,
    });
    res.status(200).json(response);
  },
  deleteUser: async (req: Request, res: Response) => {
    const {id} = req.params;
    const deletedUsers: number = await deleteUser({id});

    if (deletedUsers === 0) {
      res.status(404).json(
        failureResponse({
          message: 'No record found for user with given id.',
        })
      );
    }

    res.status(200).json(
      successResponse({
        message: 'User deleted',
      })
    );
  },
};
