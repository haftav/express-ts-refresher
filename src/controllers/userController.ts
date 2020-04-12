import { Request, Response } from 'express';

const getUser = (req: Request, res: Response) => {
  res.status(200).send('My name Tav.');
};

const userController = {
  getUser,
};

export default userController;
