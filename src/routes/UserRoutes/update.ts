import { Router } from 'express';
import UserController from '../../app/modules/User/UserController';

const route = Router();

route.put('/user/id/:id', UserController.update);
route.put('/user/id/:id', UserController.update);
route.put('/user', UserController.update);

module.exports=route
