const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const Student = require('../models/student.model'); // ✅ Correct way to import model

// Show form to insert a new student
router.get('/', (req, res) => {
    res.render('student/addOrEdit', {
        viewTitle: "Insert Student"
    })
})

// Handle form submission
router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res)
    } else {
        updateRecord(req, res)
    }
})

// Function to insert a new student
function insertRecord(req, res) {
    var student = new Student({
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city
    });

    student.save((err, doc) => {
        if (!err) {
            res.redirect('/student/list') // ✅ Correct success handling
        } else {
            console.log('Error during insert: ' + err);
        }
    })
}

// Function to update a student
function updateRecord(req, res) {
    Student.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/student/list') // ✅ Correct success handling
        } else {
            console.log('Error during update: ' + err);
        }
    })
}

// List all students
router.get('/list', async (req, res) => {
    try {
        const students = await Student.find();
        res.render('student/list', { list: students });

    } catch (err) {
        console.error('Error in retrieval:', err);
        res.status(500).send('Error retrieving students');
    }
});


// Edit a student
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            res.render("student/addOrEdit", {
                viewTitle: "Update Student",
                student
            });
            console.log(student);
        } else {
            res.status(404).send("Student not found");
        }
    } catch (err) {
        console.error("Error fetching student:", err);
        res.status(500).send("Error retrieving student");
    }
});


// ✅ Fix the delete route
router.get('/delete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/student/list');
    } catch (err) {
        console.error("Error in deletion:", err);
        res.status(500).send("Error deleting student");
    }
});


module.exports = router;
