import {Router} from 'express';

import userRouter from './userRouter';

export function apiRouter(): Router {
  const router: Router = Router();
  router.use('/users', userRouter);

  return router;
}
