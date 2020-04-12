import { Router } from 'express';

import userController from '../../controllers/userController';

const userRouter: Router = Router();

userRouter.get('/', userController.getUser);

export default userRouter;
