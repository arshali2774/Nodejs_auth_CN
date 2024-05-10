import express from 'express';
import authRouter from './src/routes/auth.routes.js';
import { connectToDB } from './src/config/db.config.js';
import passport from './src/config/passport.config.js';
import session from 'express-session';
import flash from 'connect-flash';
import dotenv from 'dotenv';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
dotenv.config();

// app
const app = express();
//Middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));
app.use(expressEjsLayouts);
// Use express-session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);
// Use connect-flash middleware
app.use(flash());
// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', authRouter);

//Start Server
app.listen(3000, () => {
  console.log('Server running on port 3000');
  connectToDB();
});
