import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecepientController from './app/controllers/RecepientController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recepient', RecepientController.store);
routes.put('/recepient', RecepientController.update);

// routes.put('/users', UserController.update);

export default routes;
