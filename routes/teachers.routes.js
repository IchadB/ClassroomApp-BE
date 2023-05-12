const express = require('express');
const routes = express.Router();

const teacherController = require('../controllers/teachers.controller')

routes.get('/get-teachers', teacherController.getAllTeachers);
routes.get('/get-students', teacherController.getAllStudents);
routes.get('/get-students/:id', teacherController.getStudent);
routes.post('/add-student', teacherController.regStudent);
routes.post('/create-exam-first-part', teacherController.createExamFirstPart);
routes.get('/get-exams', teacherController.getExams);
routes.get('/get-exam/:id', teacherController.getExam);
module.exports = routes;