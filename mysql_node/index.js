const express = require('express')
const mysql = require('mysql')

//create a db connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'nodemysql'
})


//connect to mysql
db.connect(err => {
    if(err) {
        throw err
    }
    console.log('My SQL Connected')
})

const app = express()

// create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Database Created')
    })
})

//create a table
app.get('/createemployee', (req, res ) => {  
     let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))'
     db.query(sql, err => {
        if(err){
            throw err
        }
        res.send('Employee table created')
     })
} )
 

//insert an employee
app.get('/employee1', (req, res) => {
    let post = {name: 'Jake Smith', designation: 'Chief Executive Officer'}
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql, post, err => {
        if(err){
            throw err
        }
        res.send('Employee added')
    })
})

//select employees
app.get('/getemployee', (req, res)=>{
    let sql = 'SELECT * FROM employee'
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        console.log(results)
        res.send('Employee details fetched')
    })
})

//update employee
app.get('/updateemployee/:id', (req, res) => {
    let newName = 'Updated name'
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = '${req.params.id}'  `
    let query = db.query(sql, err => {
        if (err){
            throw err
        }
        res.send('Employee updated')
    })
})


//delete employee
app.get('/deleteemployee/:id', (req, res) =>{
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`
    let query = db.query(sql, err => {
        if (err){
            throw err
        }
        res.send('Employee deleted')
    })
})



app.listen(4200, () => {
    console.log('server started at port 4200')
})