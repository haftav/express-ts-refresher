import {Router} from 'express';

import * as authController from '../../controllers/authController';

const authRouter: Router = Router();

authRouter.post('/login', authController.login);
authRouter.post('/token', authController.requestToken);

export default authRouter;
