import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send("Server up and running!");
});

app.listen(port, ()=>{
    console.log("Server running on port 3000");
});