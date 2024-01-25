import express from "express";
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Server up and running!");
});

app.listen(PORT, ()=>{
    console.log("Server running on port 3000");
});