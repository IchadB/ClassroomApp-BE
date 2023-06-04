const express = require("express");
const routes = express.Router();

const studentsController = require("../controllers/students.controller");

//login a student or teacher
routes.post("/login", studentsController.loginUser);
//get all students
routes.get("/get-students", studentsController.getAllStudents);

//registering a student
routes.post("/reg-student", studentsController.regStudent);

module.exports = routes;
