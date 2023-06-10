const studentsModel = require("../models/student_mongo");
const attendanceModel = require("../models/student-attendance_mongo");

const getAllStudents = (req, res) => {
	studentsModel.find().then((students) => {
		!students.length
			? res.status(200).json({ status: false, message: "Students not found!" })
			: res.status(200).json(students);
	});
};

function regStudent(req, res) {
	// const {
	//   fname,
	//   lname,
	//   username,
	//   contact,
	//   age,
	//   gender,
	//   address,
	//   password,
	//   password2,
	// } = req.body;
	// const id = studentsModel.length;
	// if (
	//   !fname ||
	//   !lname ||
	//   !username ||
	//   !contact ||
	//   !age ||
	//   !gender ||
	//   !address ||
	//   !password ||
	//   !password2
	// ) {
	//   res.status(400).json({ msg: "Please fill out all fields" });
	// } else if (password !== password2) {
	//   res.status(400).json({ msg: "Password does not match" });
	// } else {
	//   studentsModel.push({
	//     id,
	//     fname,
	//     lname,
	//     username,
	//     contact,
	//     age,
	//     gender,
	//     address,
	//     password,
	//   });
	//   res.status(200).json({ status: true });
	// }
}

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

module.exports = {
	getAllStudents,
	regStudent,
	addStudentAttendance,
	getAllAttendanceStudents,
};
