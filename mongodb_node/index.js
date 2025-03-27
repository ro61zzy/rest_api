require('./models/db')

const express = require("express")
const path = require("path")
const handlebars = require("handlebars")
const { engine } = require("express-handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser')

const studentController = require('./controllers/studentController')

const app = express()

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())


app.get('/', (req, res)=>{
    res.send(`
        <h2>Welcome to Student Database</h2>
        <h3>Click here to access <b><a href="/student/list">Database</a></b></h3>
        `)
})

app.set('views', path.join(__dirname, '/views'))

app.engine('hbs', engine({// <-- Add `.engine`
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutsDir: path.join(__dirname, 'views', 'layouts')
}));

app.set('view engine', 'hbs');

app.listen(2300, ()=>{
    console.log("Server started at port 2300")
})

app.use('/student', studentController)