// const express = require("express");
import express from 'express'
import cors from 'cors'
import clientRoutes from './routes/clientRoute.js'


const port = 3005;
const app = express();
app.use(cors());
app.use(express.json())


app.use('/api', clientRoutes)


app.get("/", async (req, res) => {
    res.send("<h1>Hello Backend</h1>")
});



app.listen(port, () => console.log(`Server has started on port: ${port}`));