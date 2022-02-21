import { Router } from 'express';
import UserController from '../../app/modules/User/UserController';

const route = Router();

route.get('/user', UserController.get);
route.get('/user/id/:id', UserController.get);
route.get('/user/numberDocument/:numeroDeDocumento', UserController.getByNumeroDeDocumento);
route.get('/user/limit/:limit', UserController.get);
route.get('/user/genero/:genero', UserController.getByGenero);
route.get('/user/genero/:genero/:limit', UserController.getByGenero);

module.exports = route;
