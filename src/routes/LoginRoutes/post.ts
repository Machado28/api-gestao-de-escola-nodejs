import { Router } from 'express';
import LoginController from '../../app/modules/User/services.ts/Login/LoginController';

const route = Router();
route.post('/login/user/:userId/contact/:contactId', LoginController.store);

module.exports = route;
