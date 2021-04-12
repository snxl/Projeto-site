import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import FormData from 'form-data';
import multer from 'multer';
import fs from 'fs';
import connection from './model/mySQLConnection.js';


import indexRouter from './routes/index.js';
import registerRouter from './routes/register.js';
import profileRouter from './routes/profile.js';
import registerPOST from './routes/register.js';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const form = new FormData();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // error first callback
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    // error first callback
    cb(null,`${file.fieldname}.${path.extname(file.originalname)}`)
  }
});
const upload = multer({storage})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/index.ejs', indexRouter);
app.use('/home', indexRouter);
app.use('/register', upload.single("myFile"), registerRouter);
app.use('/profile', profileRouter);
app.use('/post', registerPOST);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;