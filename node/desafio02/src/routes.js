import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/user', UserController.store);
// routes.post('/session', SessionController.store);

// routes.put('/user', SessionController.update);

export default routes;
