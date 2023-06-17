const express = require("express");
const routes = express.Router();

const studentsController = require("../controllers/students.controller");

routes.get("/get-students", studentsController.getAllStudents);
routes.post("/attendance-students", studentsController.addStudentAttendance);
routes.get("/get-attendances", studentsController.getAllAttendanceStudents);
routes.get("/student/:email", studentsController.getStudentByEmail);
routes.get("/exam/:id", studentsController.getStudentExamById);
routes.post("/answers", studentsController.answeredStudentExams);

module.exports = routes;
