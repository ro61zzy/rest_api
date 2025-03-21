const express = require('express')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/users', require('./routes/api/users'))

app.listen(4000, () => {
    console.log("Server started at port 4000")
})

// app.get('/',(req, res) => {
//     res.send("hello there")
// })