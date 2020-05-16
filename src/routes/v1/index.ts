import {Router} from 'express';

import authRouter from './authRouter';
import songRouter from './songRouter';
import userRouter from './userRouter';

export function routes(): Router {
  const router: Router = Router();
  router.use('/auth', authRouter);
  router.use('/user', userRouter);
  router.use('/songs', songRouter);

  return router;
}
