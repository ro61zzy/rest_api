const express = require('express')
const router = express.Router()
const uuid = require('uuid') //for unique identifiers to use in our project
let users = require('../../Users')


//get all users
router.get('/', (req,res)=>{
    res.json(users)
})