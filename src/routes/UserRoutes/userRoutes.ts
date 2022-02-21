import { Router } from 'express';
const post = require('./post')
const Delete = require('./delete')
const get = require('./get')
const userRoutes = Router();
const update = require('./update')

userRoutes.use(post)
userRoutes.use(Delete)
userRoutes.use(get)
userRoutes.use(update)
module.exports = userRoutes;
