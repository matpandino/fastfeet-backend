import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliverymanDeliveriesController from './app/controllers/DeliverymanDeliveriesController';
import DeliveryPickupController from './app/controllers/DeliveryPickupController';
import DeliveryDeliverController from './app/controllers/DeliveryDeliverController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliveryController from './app/controllers/DeliveryController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/delivery/:id/pickup', DeliveryPickupController.store);
routes.post('/delivery/:id/deliver', DeliveryDeliverController.store);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.post('/files', upload.single('file'), FileController.store);

routes.get(
  '/deliveryman/:id/deliveries',
  DeliverymanDeliveriesController.index
);

routes.use(authMiddleware);

routes.get('/recipient', RecipientController.index);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.get('/delivery/:id/problems', DeliveryProblemController.index);
routes.get('/delivery/problems', DeliveryProblemController.index);
routes.delete('/delivery/:id/cancel', DeliveryProblemController.delete);

routes.get('/deliveries', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

export default routes;
