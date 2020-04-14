import {Router} from 'express';

import userController from '../../controllers/userController';

const userRouter: Router = Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/signup', userController.createUser);
userRouter.delete('/user/:id', userController.deleteUser);

export default userRouter;
