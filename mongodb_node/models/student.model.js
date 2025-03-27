const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: "This field is required"
    },
    email: {
        type: String,
        required: "This field is required"
    },
    mobile: {
        type: Number,
        required: "This field is required"
    },
    city: {
        type: String,
        required: "This is required"
    }
});


module.exports = mongoose.model("Student", studentSchema);
