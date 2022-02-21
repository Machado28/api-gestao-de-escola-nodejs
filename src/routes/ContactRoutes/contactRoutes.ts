import { Router } from 'express';
const post = require('./post')
const Delete = require('./delete')
const get = require('./get')
const contactRoutes = Router();
const update = require('./update')

contactRoutes.use(post)
contactRoutes.use(Delete)
contactRoutes.use(get)
contactRoutes.use(update)
module.exports = contactRoutes;
