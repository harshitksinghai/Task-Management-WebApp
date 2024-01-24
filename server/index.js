import express from "express";
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Server up and running!");
});

app.listen(PORT, ()=>{
    console.log("Server running on port 3000");
});