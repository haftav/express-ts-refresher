import {Router} from 'express';

import projectRouter from './projectRouter';
import userRouter from './userRouter';

export function routes(): Router {
  const router: Router = Router();
  router.use('/user', userRouter);
  router.use('/projects', projectRouter);

  return router;
}
