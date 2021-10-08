const express = require('express');
//Creating a Router
var router = express.Router();
var courseController= require('../controllers/courseController');
router.route('/course').get(courseController.index);
router.route('/course').post(courseController.addOrUpdate);
router.route('/course/list').get(courseController.list);
router.route('/course/:id').get(courseController.view);
router.route('/course/delete/:id').get(courseController.destroy);
module.exports = router;