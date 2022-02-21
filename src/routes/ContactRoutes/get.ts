import { Router } from 'express';
import ContactController from '../../app/modules/Contact/ContactController';

const route = Router();

route.get('/contact', ContactController.get);
route.get('/contact/id/:id', ContactController.get);
route.get('/contact/limit/:limit', ContactController.get);
route.get('/contact/user/id/:userId', ContactController.getAllByUser);
route.get('/contact/user/id/:userId/limit/:limit', ContactController.getAllByUser);
// route.get('/contact/genero/:genero', ContactController.getByGenero);
// route.get('/contact/genero/:genero/:limit', ContactController.getByGenero);

module.exports = route;
