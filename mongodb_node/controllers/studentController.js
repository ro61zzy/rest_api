const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const Student = mongoose.model('Student')

router.get('/', (req, res)=>{
    res.render('student/addOrEdit', {
        viewTitle: "Insert Student"
    })
})