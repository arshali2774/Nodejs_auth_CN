import UserModel from '../models/user.model.js';

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
