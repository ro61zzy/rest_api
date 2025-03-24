const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const port = 5400


app.get ('/api', (req, res)=>{
    res.json({
        message:"Hey !! Welcome to API's"
    })
})

