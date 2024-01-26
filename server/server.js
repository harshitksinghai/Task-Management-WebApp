import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;

app.use(express.json()); // allows to parse raw json
app.use(express.urlencoded({extended: true})); // allows to use form data
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send("Server up and running!");
});

// next() is like a callback function
// If next() is called in any middleware, then express moves on to the next middleware or route handler in line (in this case it would be app.use(errorHandler);) (A route handler in Express is essentially a middleware function that is specific to a particular route. So, route handler can also contain next() or next(err))
// If next is called with an argument (in this case, the error object) (as in case of app.use(notFound); middleware (check notFound code in errorMiddleware.js)), Express recognizes it as an error, and it skips to the next error-handling middleware (in server.js, among remaining error-handling middlewares, app.use(errorHandler); is the first one in line, so it's invoked) in the line (technical term: stack. (line is used for better understanding)).
app.use(notFound); // this is a middleware
app.use(errorHandler); // this is an error handling middleware (to know more, go into errorMiddleware.js) and it can only be invoked if next(error) is called by some code, so then error-handling middleware will handle the error 

app.listen(port, ()=>{
    console.log("Server running on port 3000");
});