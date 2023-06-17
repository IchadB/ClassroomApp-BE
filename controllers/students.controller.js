const studentsModel = require("../models/student_mongo");
const attendanceModel = require("../models/student_attendance_mongo");
const examModel = require("../models/exam_mongo");
const answeredExamModel = require("../models/answered_exam_mongo");
const { ObjectId } = require("bson");

const getAllStudents = (req, res) => {
	studentsModel.find().then((students) => {
		!students.length
			? res.status(200).json({ status: false, message: "Students not found!" })
			: res.status(200).json(students);
	});
};

const addStudentAttendance = (req, res) => {
	const { attendance, fname, lname, email, comment } = req.body;

	attendanceModel.find({ email: email }).then((data) => {
		if (!data.length) {
			attendanceModel.create({
				attendance,
				fname,
				lname,
				email,
				comment,
			});
			res.status(200).json({
				status: true,
				message: "you attendance has been sent",
			});
		} else {
			res.status(200).json({
				status: false,
				message: "you have already submitted your response",
			});
		}
	});
};

const getAllAttendanceStudents = (req, res) => {
	attendanceModel.find({}).then(async (data) => {
		if (!data.length) {
			await res.status(200).json({
				status: false,
				message: "No attendance found",
			});
		} else {
			res.status(200).json(data);
		}
	});
};

const getStudentByEmail = (req, res) => {
	const email = req.params.email;
	console.log(email);

	studentsModel.find({ email: email }).then((student) => {
		if (!student.length) {
			console.log(student);
			res.status(200).json({ status: false, message: "User not found" });
		} else {
			res.json(student);
		}
	});
};

const getStudentExamById = async (req, res) => {
	const id = req.params.id;
	if (ObjectId.isValid(id)) {
		const exam = await examModel.find({ _id: id });
		exam
			? res.status(200).json(exam)
			: res.status(400).json({ status: false, msg: "Bad Request" });
	} else {
		res.status(400).json({ status: false, msg: "Invalid Request URI" });
	}
};

const answeredStudentExams = (req, res) => {
	const { subject, answer, studentId, examId } = req.body;
	// console.log(subject, answer, studentId, examId);

	answeredExamModel.find({ studentId: studentId }).then(async (data) => {
		if (!data.length) {
			await answeredExamModel.create({
				subject,
				answer,
				studentId,
				examId,
			});
			res.status(200).json({
				status: true,
				message: "your answers has been sent",
			});
		}
		// else {
		// 	res.status(200).json({
		// 		status: false,
		// 		message: "Answer already exists",
		// 	});
		// }
	});
};

module.exports = {
	getAllStudents,
	addStudentAttendance,
	getAllAttendanceStudents,
	getStudentByEmail,
	getStudentExamById,
	answeredStudentExams,
};
