import { Router } from 'express';
import Signin from '../../app/modules/User/services.ts/Signin/Signin';
import Autenticacao from './../../app/middlewares/auth'
const route = Router();

Autenticacao.apiAuth
route.post('/signin', Signin.execute);

module.exports =route
