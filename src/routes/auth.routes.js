import express from 'express';
import { getSignUpPage, registerUser } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.get('/signup', getSignUpPage);
authRouter.post('/signup', registerUser);

export default authRouter;
