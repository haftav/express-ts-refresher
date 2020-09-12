import {Router} from 'express';

import userController from '../../controllers/userController';
import {authMiddleware} from '../../middleware';

const userRouter: Router = Router();

userRouter.get('/', authMiddleware, userController.getUser);
userRouter.post('/signup', userController.createUser);
userRouter.post('/login', userController.loginUser);
userRouter.delete('/:id', authMiddleware, userController.deleteUser);

export default userRouter;
