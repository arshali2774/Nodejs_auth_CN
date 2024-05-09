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
  // Pass the flash message to the view
  const flashMessage = req.flash('success');
  res.render('home', { messages: flashMessage });
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

// Controller middleware to handle form submission for resetting the password
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const userId = req.user.id; // user ID is stored in the session

  try {
    // Get the user from the database
    const user = await UserModel.findById(userId);
    if (!user) {
      // Handle case where user is not found
      return res.status(404).send('User not found');
    }

    // Verify that the provided email matches the authenticated user's email
    if (user.email !== email) {
      // Handle case where email does not match
      return res.status(403).send('Email does not match authenticated user');
    }

    // Update the user's password in the database with the hashed password
    user.password = password;
    await user.save();

    // Redirect to the homepage with a success message
    req.flash('success', 'Password reset successfully');
    res.redirect('/home');
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Error resetting password');
  }
};

// Controller middleware to handle Google authentication
export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// Controller middleware to handle Google authentication callback
export const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Handle authentication failure by redirecting to the signup page
      return res.redirect('/signup');
    }
    // Log in the user
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Redirect to home page with success message
      req.flash('success', 'You have successfully logged in with Google.');
      res.redirect('/home');
    });
  })(req, res, next);
};
