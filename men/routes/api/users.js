const express = require('express')
const router = express.Router()
const uuid = require('uuid') //for unique identifiers to use in our project
let users = require('../../Users')


//get all users
router.get('/', (req,res)=>{
    console.log("see req",req)
    res.json(users)
})

router.get("/:id", (req, res)=>{
    const found = users.some(user => user.id === parseInt(req.params.id))

    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.sendStatus(400)
    }
})

module.exports = router