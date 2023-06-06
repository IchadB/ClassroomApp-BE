const teacherModel = require("../models/teachers.model");
const studentsModel = require("../models/students.model");

function getAllTeachers(req, res) {
	!teacherModel
		? res
				.status(200)
				.json({ status: false, msg: "No Teacher/s registered yet" })
		: res.status(200).json({ status: true, teacher: teacherModel });
}

function getAllStudents(req, res) {
	res.json(studentsModel);
}

function loginUser(req, res) {
	const { username, password } = req.body;
	const findStudent = studentsModel.find(
		(student) => student.username === username && student.password === password
	);
	const findTeacher = teacherModel.find(
		(teacher) => teacher.username === username && teacher.password === password
	);

	if (findStudent) {
		return res.status(200).json({ status: true, value: "Student" });
	} else if (findTeacher) {
		return res.status(200).json({ status: true, value: "Teacher" });
	} else {
		return res.status(200).json({ status: false, msg: "User not found" });
	}
}

function regStudent(req, res) {
	const {
		fname,
		lname,
		username,
		contact,
		age,
		gender,
		address,
		password,
		password2,
	} = req.body;
	const id = studentsModel.length;

	if (
		!fname ||
		!lname ||
		!username ||
		!contact ||
		!age ||
		!gender ||
		!address ||
		!password ||
		!password2
	) {
		res.status(200).json({ msg: "Please fill out all fields" });
	} else if (password !== password2) {
		res.status(200).json({ msg: "Password does not match" });
	} else {
		studentsModel.push({
			id,
			fname,
			lname,
			username,
			contact,
			age,
			gender,
			address,
			password,
		});
		res.status(200).json({ status: true, message: "Registered Successfully" });
	}
}

function studentsAttendance(req, res) {
	const { fname, lname, attendance, email, comment } = req.body;

	if ((fname, lname, attendance, email, comment)) {
		res.status(200).json({ status: true, message: "submitted successfully" });
	}
}

module.exports = {
	getAllTeachers,
	getAllStudents,
	loginUser,
	regStudent,
	studentsAttendance,
};
