const express = require("express");
const routes = express.Router();

const { protectRoutes } = require("../middleware/authMiddleware");
const studentsController = require("../controllers/students.controller");

routes.get("/get-students", protectRoutes, studentsController.getAllStudents);
routes.post(
	"/attendance-students",
	protectRoutes,
	studentsController.addStudentAttendance
);
routes.get(
	"/get-attendances",
	protectRoutes,
	studentsController.getAllAttendanceStudents
);
routes.get(
	"/student/:email",
	protectRoutes,
	studentsController.getStudentByEmail
);
routes.get("/exam/:id", protectRoutes, studentsController.getStudentExamById);
routes.post(
	"/exam-answers",
	protectRoutes,
	studentsController.answeredStudentExams
);

module.exports = routes;
