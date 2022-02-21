import { Router } from 'express';
import UserController from '../../app/modules/User/UserController';

const route = Router();
route.post('/user', UserController.store);

module.exports =route
