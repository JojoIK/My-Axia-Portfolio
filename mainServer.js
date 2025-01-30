const express = require('express');
const bookRouter = require('./Router/bookRouter');
const userRouter = require('./Router/userRouter');
const connectDB = require('./DB/dbController');
const cookieParser = require('cookie-parser');
const err = require('./Middlewares/errorMiddleware');
require('dotenv').config();//the .env must be required and configured here so that the server can have access to it 
/*The variables in .env should be saved in all caps */

const libraryapp = express();

const port = process.env.PORT;

connectDB()// DB Connect

libraryapp.use(express.json())// Built-in middleware to parse or read json coming from frontend

libraryapp.use(express.urlencoded({extended: true}))//Built-in middleware used to read url encoded information 

libraryapp.use(cookieParser())

libraryapp.use('/api', bookRouter)// application-level middleware to connect to path|| router
libraryapp.use('/api', userRouter)

libraryapp.use(err)// always use error-handling middleware at the end of all routes

libraryapp.listen(port, () => {console.log('Listening')})

