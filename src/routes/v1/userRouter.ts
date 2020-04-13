import {Router} from 'express';

import userController from '../../controllers/userController';

const userRouter: Router = Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/user', userController.createUser);

export default userRouter;
