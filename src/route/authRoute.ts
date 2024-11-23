import express from 'express';
import authController from '../controller/authController';

//auth router
const authRoute = express.Router();

authRoute.post('/register', authController.register)
authRoute.post('/signIn', authController.login)

export default authRoute;