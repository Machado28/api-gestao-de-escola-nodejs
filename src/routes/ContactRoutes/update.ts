import { Router } from 'express';
import ContactController from '../../app/modules/Contact/ContactController';

const route = Router();

route.put('/contact', ContactController.get);
route.put('/contact/id/:id', ContactController.get);

module.exports = route;
