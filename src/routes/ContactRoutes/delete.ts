import { Router } from 'express';
import ContactController from '../../app/modules/Contact/ContactController';

const route = Router();

route.delete('/contact/user/id/:userId', ContactController.delete);
route.delete('/contact/id/:id/user/id/:userId', ContactController.delete);

module.exports = route;
