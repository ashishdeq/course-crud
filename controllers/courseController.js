//Import the dependencies
const express = require('express');
const mongoose = require('mongoose');
//Creating a Router
var router = express.Router();
const Course = require('../models/course.model');

exports.index = function (req, res) {
    res.render("course/courseAddEdit", {
        viewTitle: "Insert a New Course for Deqode"
    });
    //res.json('test');
}

//Creating function to insert Course
function insertCourse(req, res) {
    var course = new Course();
    course.courseName = req.body.courseName;
    course.courseId = req.body.courseId;
    course.courseDuration = req.body.courseDuration;
    course.courseFee = req.body.courseFee;
    course.save((err, doc) => {
        if (!err)
            res.redirect('course/list');
        else
            console.log('Error during record insertion : ' + err);
    });
}

//Creating a function to update updateCourse
function updateCourse(req, res) {
    Course.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('course/list'); }
        else {
            console.log('Error during updating the record: ' + err);
        }
    });
}



exports.addOrUpdate = function (req, res) {
    if (req.body._id == '')
        insertCourse(req, res);
    else
        updateCourse(req, res);
}

//Creating a function to list course 
exports.list = function (req, res) {
    Course.find((err, docs) => {
        if (!err) {
            res.render("course/list", {
                list: docs
            });
        }
        else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
}
//Creating a function to view course 
exports.view = function (req, res) {
    console.log(req.params.id);
    Course.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("course/courseAddEdit", {
                viewTitle: "Update Course Details",
                course: doc
            });
        }
    });
}
//Creating a function to delete course 
exports.destroy = function (req, res) {
    Course.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/course/list');
        }
        else { console.log('Failed to Delete Course Details: ' + err); }
    });
}