const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/StudentDB',{
    userNewUrlParser: true
},
err => {
    if(!err){
        console.log('Connection successeeded')
    }else{
        console.log("Error in connection"+err)
    }
})

require('./student.model')