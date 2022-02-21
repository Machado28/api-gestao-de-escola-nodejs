import { Router } from 'express';
import ContactController from '../../app/modules/Contact/ContactController';

const route = Router();
route.post('/contact', ContactController.store);

module.exports = route;
