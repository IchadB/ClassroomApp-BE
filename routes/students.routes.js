const express = require("express");
const routes = express.Router();

const studentsController = require("../controllers/students.controller");

routes.get("/get-students", studentsController.getAllStudents);
routes.post("/reg-student", studentsController.regStudent);
routes.post("/attendance-students", studentsController.addStudentAttendance);
routes.get("/get-attendances", studentsController.getAllAttendanceStudents);

module.exports = routes;
