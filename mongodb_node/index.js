const express = require("express")
const path = require("path")
const handlebars = require("handlebars")
const exphbs = require("express-handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser')


const app = express()

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())


app.get('/', (req, res)=>{
    res.send(`
        <h2>Welcome to Student Database</h2>
        <h3>Click here to access <b><a href="/student/list">Database</a></b></h3>
        `)
})





app.listen(2300, ()=>{
    console.log("Server started at port 2300")
})