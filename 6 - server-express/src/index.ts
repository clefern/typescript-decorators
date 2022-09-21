import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/LoginController';
import './controllers/Root.controller';
import { AppRouter } from './app-router';

const app = express();
const router = AppRouter.getInstance();
/**
 * Those are middlewares that transform the request
 */
// set a body in the request
app.use(bodyParser.urlencoded({ extended: true }));
// set a session on the request
app.use(cookieSession({ keys: ['doesnt-matter-the-key-we-pass-here'] }));
app.use(router);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
