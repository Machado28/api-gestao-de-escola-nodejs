import { Router } from 'express';
const post = require('./post')

const get = require('./get')
const loginRoutes = Router();


loginRoutes.use(post)

loginRoutes.use(get)

module.exports = loginRoutes;
