import UserModel from '../models/user.model.js';
import passport from '../config/passport.config.js';
// controller to render the signup page
export const getSignUpPage = (req, res) => {
  res.render('signup');
};

//controller to add user in database and send response
export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.create({ email, password });
    res.send('Sign up successfull');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error signing up');
  }
};

//controller to render the signin page
export const getSignInPage = (req, res) => {
  const errorMessage = req.flash('error');
  res.render('signin', { errorMessage });
};

// Controller middleware to handle sign-in form submissions
export const loginUser = passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/signin',
  failureFlash: true,
});

// Controller middleware to render the home page
export const getHomePage = (req, res) => {
  res.render('home');
};

// Controller middleware to handle sign-out
export const signOutUser = (req, res) => {
  // Passport's logout function is used to terminate the login session
  req.logout((err) => {
    if (err) {
      console.error('Error signing out:', err);
      res.status(500).send('Error signing out');
    } else {
      // Redirect the user to the sign-in page after successful sign-out
      res.redirect('/signin');
    }
  });
};

// Controller middleware to render the reset password page
export const getResetPasswordPage = (req, res) => {
  res.render('resetpassword');
};
