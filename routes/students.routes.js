const express = require("express");
const routes = express.Router();

const studentsController = require("../controllers/students.controller");

routes.post("/login", studentsController.loginUser);
routes.get("/get-students", studentsController.getAllStudents);
routes.post("/reg-student", studentsController.regStudent);

routes.post("/register-student", studentsController.registerStudents);

module.exports = routes;
