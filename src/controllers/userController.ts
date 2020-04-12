import {Request, Response} from 'express';

import {getUsers} from '../services/user.service';

export default {
  getUsers: async (req: Request, res: Response) => {
    const users = await getUsers();
    res.status(200).send(users);
  },
};
