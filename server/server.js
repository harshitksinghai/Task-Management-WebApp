import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;


// Allow requests from localhost:5173
const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
  };
  
app.use(cors(corsOptions));


app.use(express.json()); // allows to parse raw json
app.use(express.urlencoded({extended: true})); // allows to use form data
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);


app.get('/', (req, res) => {
    res.send("Server is up and running!");
});

// next() is like a callback function
// If next() is called in any middleware, then express moves on to the next middleware or route handler in line (in this case it would be app.use(errorHandler);) (A route handler in Express is essentially a middleware function that is specific to a particular route. So, route handler can also contain next() or next(err))
// If next is called with an argument (in this case, the error object) (as in case of app.use(notFound); middleware (check notFound code in errorMiddleware.js)), Express recognizes it as an error, and it skips to the next error-handling middleware (in server.js, among remaining error-handling middlewares, app.use(errorHandler); is the first one in line, so it's invoked) in the line (technical term: stack. (line is used for better understanding)).
app.use(notFound); // this is a middleware // this line of code is written after all route handlers for handling HTTP requests. // i think the reason is that if code has reached this line, means none of the route handlers were executed, so this middleware then gives NOT FOUND error.
app.use(errorHandler); // this is an error handling middleware (to know more, go into errorMiddleware.js) and it can only be invoked if next(error) is called by some code, so then error-handling middleware will handle the error 

app.listen(port, ()=>{
    console.log("Server running on port 3000");
});


