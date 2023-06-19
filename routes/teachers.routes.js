const express = require("express");
const routes = express.Router();

const { protect } = require("../middleware/authMiddleware");
const teacherController = require("../controllers/teachers.controller");

routes.get("/get-students-exams", protect, teacherController.getExamsOfStudent);

routes.get("/get-teacher/:id", protect, teacherController.getTeacher);
routes.get("/get-teachers", protect, teacherController.getAllTeachers);
routes.get("/get-students", protect, teacherController.getAllStudents);
routes.get("/get-students/:id", protect, teacherController.getStudent);
routes.get("/activities", protect, teacherController.getExams);
routes.get("/activities/:id", protect, teacherController.getExam);
routes.get("/activities/part2/:id", protect, teacherController.getExam);
routes.post("/add-teacher", protect, teacherController.regTeacher);
routes.post("/add-student", protect, teacherController.regStudent);
routes.post(
  "/create-exam-first-part",
  protect,
  teacherController.createExamFirstPart
);
routes.patch(
  "/create-exam-second-part/:id",
  teacherController.createExamSecondPart
);

routes.put("/update-student/:id", protect, teacherController.updateStudent);
routes.delete("/delete-student/:id", protect, teacherController.deleteStudent);
routes.delete("/activities/:id", protect, teacherController.deleteExam);

module.exports = routes;
