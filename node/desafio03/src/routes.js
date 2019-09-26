import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import MeetupController from './app/controllers/MeetupController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

// Requisição token
routes.use(authMiddleware);

// User
routes.put('/user', UserController.update);

// Meetup
routes.get('/meetup', MeetupController.index);
routes.post('/meetup', upload.single('file'), MeetupController.store);

export default routes;
