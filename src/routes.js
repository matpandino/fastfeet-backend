import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecepientController from './app/controllers/RecepientController';
import DeliverymanController from './app/controllers/DeliverymanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/recepient', RecepientController.index);
routes.post('/recepient', RecepientController.store);
routes.put('/recepient/:id', RecepientController.update);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

export default routes;
