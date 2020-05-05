import {Router} from 'express';

import * as songController from '../../controllers/songController';
import {authMiddleware} from '../../middleware';

const songRouter: Router = Router();

songRouter.get('/', authMiddleware, songController.getSongs);
songRouter.post('/', authMiddleware, songController.createSong);
songRouter.put('/:id', authMiddleware, songController.updateSong);
songRouter.delete('/:id', authMiddleware, songController.deleteSong);

export default songRouter;
