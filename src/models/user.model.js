import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//create user schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // convert email to lowercase before saving
    validate: {
      validator: function (value) {
        // Simple email validation using regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function (value) {
        // Password complexity validation using regex
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
          value
        );
      },
      message: (props) =>
        `Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.`,
    },
  },
});

//using mongoose middlewares we can hash password before saving
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    //not using arrow function, because then we cannot access "this" keyword.
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
