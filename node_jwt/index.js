const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const port = 5400

function verifyToken (req, res, next){
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403) //forbidden
    }
}

app.get ('/api', (req, res)=>{
    res.json({
        message:"Hey !! Welcome to API's"
    })
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if(err){
            res.sendStatus(403)
        } else {
            
        }
    })
    res.json({
        message: 'Posts created....'
    })
})

app.post('/api/login', (req,res) => {
    const user = {
        id: 1,
        username: "Rose",
        email:"rose@example.com"
    }

    jwt.sign({user: user}, 'secretkey', (err, token) => {
        res.json({
            token,
        })
    })
})

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})
