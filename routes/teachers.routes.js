const express = require("express");
const routes = express.Router();

const teacherController = require("../controllers/teachers.controller");

routes.get("/get-teachers", teacherController.getAllTeachers);
routes.get("/get-students", teacherController.getAllStudents);
routes.get("/get-students/:id", teacherController.getStudent);
routes.get("/activities", teacherController.getExams);
routes.get("/activities/:id", teacherController.getExam);

routes.post("/add-student", teacherController.regStudent);
routes.post("/create-exam-first-part", teacherController.createExamFirstPart);

routes.put("/update-student/:id", teacherController.updateStudent);
routes.delete("/delete-student/:id", teacherController.deleteStudent);

module.exports = routes;
