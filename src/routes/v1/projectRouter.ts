import {Router} from 'express';

import projectController from '../../controllers/projectController';
import {authMiddleware} from '../../middleware';

const projectRouter: Router = Router();

projectRouter.get('/', projectController.getProjects);
projectRouter.get('/:id', authMiddleware, projectController.getOneProject);
projectRouter.post('/', authMiddleware, projectController.createProject);
projectRouter.put('/:id', authMiddleware, projectController.updateProject);
projectRouter.delete('/:id', authMiddleware, projectController.deleteProject);

export default projectRouter;
