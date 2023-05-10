const express = require('express');
const routes = express.Router();

const studentsController = require('../controllers/students.controller')

routes.post('/login', studentsController.loginStudent)
routes.get('/get-students', studentsController.getAllStudents )

module.exports = routes;