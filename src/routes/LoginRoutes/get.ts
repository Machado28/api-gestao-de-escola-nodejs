import { Router } from 'express';
import LoginController from '../../app/modules/User/services.ts/Login/LoginController';

const route = Router();

route.get('/login/userId/:userId', LoginController.get);

module.exports = route;
