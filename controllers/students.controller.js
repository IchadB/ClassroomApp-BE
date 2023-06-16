const studentsModel = require("../models/student_mongo");
const attendanceModel = require("../models/student-attendance_mongo");

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

module.exports = {
	getAllStudents,
	addStudentAttendance,
	getAllAttendanceStudents,
	getStudentByEmail,
};
