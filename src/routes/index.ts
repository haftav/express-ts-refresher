import { Router } from 'express';

import { apiRouter } from './v1';

export function routes(): Router {
  const router: Router = Router();
  router.use('/api', apiRouter());

  return router;
}
