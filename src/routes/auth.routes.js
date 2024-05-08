import express from 'express';
import {
  getHomePage,
  getResetPasswordPage,
  getSignInPage,
  getSignUpPage,
  loginUser,
  registerUser,
  signOutUser,
} from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const authRouter = express.Router();

// GET route to render the sign-up form
authRouter.get('/signup', getSignUpPage);

// POST route to handle sign-up form submissions
authRouter.post('/signup', registerUser);

// GET route to render the sign-in form
authRouter.get('/signin', getSignInPage);

// POST route to handle sign-in form submissions
authRouter.post('/signin', loginUser);

// Apply isAuthenticated middleware to home route
// Home route
authRouter.get('/home', isAuthenticated, getHomePage);

// Sign-out route
authRouter.post('/signout', signOutUser);

// Reset password route
authRouter.get('/resetpassword', isAuthenticated, getResetPasswordPage);

export default authRouter;
