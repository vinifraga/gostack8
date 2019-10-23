import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import MeetupController from './app/controllers/MeetupController';
import FileController from './app/controllers/FileController';
import ScheduleController from './app/controllers/ScheduleController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();
const upload = multer(multerConfig);

// Sign up
routes.post('/user', UserController.store);
// Sign in
routes.post('/session', SessionController.store);

// Requisição token
routes.use(authMiddleware);

// User
routes.put('/user', UserController.update);

// File
routes.post('/file', upload.single('file'), FileController.store);
routes.delete('/file/:id', FileController.delete);

// Meetup
routes.get('/meetup', MeetupController.index);
routes.post('/meetup', MeetupController.store);
routes.put('/meetup/:id', MeetupController.update);
routes.delete('/meetup/:id', MeetupController.delete);

// Schedule
routes.get('/schedule', ScheduleController.index);

// Subscription
routes.get('/subscription', SubscriptionController.index);
routes.post('/subscription', SubscriptionController.store);
routes.delete('/subscription/:id', SubscriptionController.delete);

export default routes;
