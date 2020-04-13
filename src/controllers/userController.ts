import {Request, Response} from 'express';

import {createUser, getUsers} from '../services/user.service';

export default {
  createUser: async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const user = await createUser({username, password});

    res.status(200).send(user);
  },
  getUsers: async (req: Request, res: Response) => {
    const users = await getUsers();
    res.status(200).send(users);
  },
};
