const express = require("express");
const routes = express.Router();

const { protectRoutes } = require("../middleware/authMiddleware");
const teacherController = require("../controllers/teachers.controller");

routes.get(
  "/get-students-answered-exams",
  protectRoutes,
  teacherController.getExamsOfStudent
);
routes.get("/get-teacher/:id", protectRoutes, teacherController.getTeacher);
routes.get("/get-teachers", protectRoutes, teacherController.getAllTeachers);
routes.get("/get-students", protectRoutes, teacherController.getAllStudents);
routes.get(
  "/get-students-attendance",
  protectRoutes,
  teacherController.getAttendances
);
routes.get("/get-students/:id", protectRoutes, teacherController.getStudent);
routes.get("/activities", protectRoutes, teacherController.getExams);
routes.get("/activities/:id", protectRoutes, teacherController.getExam);
routes.get("/activities/part2/:id", protectRoutes, teacherController.getExam);
routes.post(
  "/create-exam-first-part",
  protectRoutes,
  teacherController.createExamFirstPart
);
routes.patch("/activities/:id", protectRoutes, teacherController.publishExam);
routes.patch(
  "/create-exam-second-part/:id",
  protectRoutes,
  teacherController.createExamSecondPart
);
routes.put(
  "/update-student/:id",
  protectRoutes,
  teacherController.updateStudent
);
routes.put(
  "/update-teacher/:id",
  protectRoutes,
  teacherController.updateTeacher
);
routes.delete(
  "/delete-student/:id",
  protectRoutes,
  teacherController.deleteStudent
);
routes.delete("/activities/:id", protectRoutes, teacherController.deleteExam);

module.exports = routes;
