const express = require("express");
const routes = express.Router();

const { protectRoutes } = require("../middleware/authMiddleware");
const teacherController = require("../controllers/teachers.controller");

routes.get(
  "/get-students-answered-exams/:id",
  protectRoutes,
  teacherController.getExamsOfStudent
);
routes.get("/get-teacher/:id", teacherController.getTeacher);
routes.get("/get-teachers", teacherController.getAllTeachers);
routes.get("/get-students", teacherController.getAllStudents);
routes.get(
  "/get-students-attendance",
  protectRoutes,
  teacherController.getAttendances
);
routes.get("/get-students/:id", teacherController.getStudent);
routes.get("/activities", teacherController.getExams);
routes.get("/activities/:id", teacherController.getExam);
routes.get("/activities/part2/:id", teacherController.getExam);
routes.post("/create-exam-first-part", teacherController.createExamFirstPart);
routes.patch("/activities/:id", teacherController.publishExam);
routes.patch(
  "/create-exam-second-part/:id",
  teacherController.createExamSecondPart
);
routes.put("/update-student/:id", teacherController.updateStudent);
routes.put("/update-teacher/:id", teacherController.updateTeacher);
routes.delete("/delete-student/:id", teacherController.deleteStudent);
routes.delete("/activities/:id", teacherController.deleteExam);

module.exports = routes;
