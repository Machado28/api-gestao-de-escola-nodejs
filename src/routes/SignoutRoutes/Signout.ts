import { Router } from 'express';
import Signout from '../../app/modules/User/services.ts/Signout/Signout';
import Autenticacao from '../../app/middlewares/auth'
const route = Router();

Autenticacao.apiAuth
route.get('/signout', Signout.execute);

module.exports =route
