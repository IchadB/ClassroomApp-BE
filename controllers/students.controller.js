const teacherModel = require("../models/teachers.model");
const studentsModel = require("../models/students.model");

function getAllTeachers(req, res) {
	!teacherModel
		? res.status(400).json({ msg: "No Teacher/s registered yet" })
		: res.json(teacherModel);
}

function getAllStudents(req, res) {
	res.json(studentsModel);
}

function loginUser(req, res) {
	const { username, password } = req.body;
	console.log(username);
	console.log(password);
	const findStudent = studentsModel.find(
		(student) => student.username === username && student.password === password
	);
	const findTeacher = teacherModel.find(
		(teacher) => teacher.username === username && teacher.password === password
	);
	// const student = findStudent.fname
	// const teacher = findTeacher.fname

	if (findStudent) {
		res.status(200).json({ status: true, value: "Student" });
	} else if (findTeacher) {
		res.status(200).json({ status: true, value: "Teacher" });
	} else {
		res.status(200).json({ msg: "User not found" });
	}
}

function regStudent(req, res) {
	const {
		fname,
		lname,
		username,
		email,
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
		!email ||
		!age ||
		!gender ||
		!address ||
		!password ||
		!password2
	) {
		res
			.status(200)
			.json({ status: false, message: "Please fill out all fields" });
	} else if (password !== password2) {
		return res.status(200).json({
			status: false,
			message: "Password does not match",
		});
	} else {
		studentsModel.push({
			id,
			fname,
			lname,
			username,
			contact,
			email,
			age,
			gender,
			address,
			password,
		});
		res.status(200).json({ status: true, message: "successfully registered" });
	}
}

module.exports = {
	getAllTeachers,
	getAllStudents,
	loginUser,
	regStudent,
};
