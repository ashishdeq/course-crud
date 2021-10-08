const mongoose = require('mongoose');
//Attributes of the Course object
var courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: 'This field is required!'
    },
    courseId: {
        type: String
    },
    courseDuration: {
        type: String
    },
    courseFee: {
        type: String
    }
});

const Course = mongoose.model('Course', courseSchema);
module.exports =Course;