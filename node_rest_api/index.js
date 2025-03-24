const express = require("express");

const app = express();
const port = 4000;

let movies = [
  {
    id: "1",
    title: "Inception",
    director: "Christopher Nolan",
    release_date: "2010-07-16",
  },
  {
    id: "1",
    title: "The Irishman",
    director: "Martin Scorsese",
    release_date: "2019-09-27",
  },
];


//get 

app.get('/movie', (req, res)=>{
    res.json(movies)
})

//post


//set server to listen to port
app.listen(port, () => console.log(`Server listening at port ${port}`))