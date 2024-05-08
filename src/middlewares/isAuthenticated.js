// Middleware function to check authentication status
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If user is authenticated, proceed to the next middleware
    return next();
  } else {
    // If user is not authenticated, redirect to sign-in page
    res.redirect('/signin');
  }
};
