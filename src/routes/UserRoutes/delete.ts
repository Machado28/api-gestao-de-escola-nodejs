import { Router } from 'express';
import UserController from '../../app/modules/User/UserController';

const route = Router();

route.delete('/user/id/:id', UserController.delete);
route.delete('/user/numberDocument/:numeroDeDocumento', UserController.delete);
route.delete('/user', UserController.delete);

module.exports=route
