import express from 'express';
import authRouter from './src/routes/auth.routes.js';
import { connectToDB } from './db.config.js';
const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('view engine', 'ejs');

app.use('/', authRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
  connectToDB();
});
