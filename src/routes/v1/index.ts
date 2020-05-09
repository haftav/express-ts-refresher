import {Router} from 'express';

import songRouter from './songRouter';
import userRouter from './userRouter';

export function routes(): Router {
  const router: Router = Router();
  router.use('/user', userRouter);
  router.use('/songs', songRouter);

  return router;
}
