const express = require("express");

const app = express();
const port = 4000;

//parse JSON req.body with express 
app.use(express.json())
app.use(express.urlencoded({extended:false}))


let movies = [
  {
    id: "1",
    title: "Inception",
    director: "Christopher Nolan",
    release_date: "2010-07-16",
  },
  {
    id: "2",
    title: "The Irishman",
    director: "Martin Scorsese",
    release_date: "2019-09-27",
  },
];


//get all
app.get('/movie', (req, res)=>{
    res.json(movies)
})

//post, add a record
app.post('/movie', (req, res)=>{
  const movie = req.body
  console.log(movie)
  movies.push(movie)

  res.send('Movie has been added to the list')
})

//get by id
app.get('/movie/:id', (req, res)=>{
    const id = req.params.id

    for(let movie of movies){
        if (movie.id === id){
            res.json(movie)
            return
        }
    }
    res.status(400).send('Movie not found')
})

//delete
app.delete('/movie/:id', (req, res)=>{
    const id = req.params.id

    movies = movies.filter(movie => {
        if (movie.id !== id){
            return true
        }
        return false
    })
    res.send('Movie is Deleted')
})

//set server to listen to port
app.listen(port, () => console.log(`Server listening at port ${port}`))