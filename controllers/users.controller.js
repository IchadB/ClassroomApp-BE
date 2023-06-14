const studentsModel = require("../models/student_mongo");
const teachersModel = require("../models/teacher_mongo");

function loginUser(req, res) {
	const username = req.body.username;
	const password = req.body.password;

	studentsModel
		.find({ username: username, password: password })
		.then((user) => {
			if (!user.length) {
				res.status(200).json({
					status: false,
					message: "User not found",
				});
			} else {
				res.status(200).json(user);
			}
		});
}

function registerUser(req, res) {
	const {
		fname,
		lname,
		username,
		contact,
		email,
		age,
		gender,
		address,
		img,
		password,
		password2,
		type,
	} = req.body;

	if (type === "student") {
		studentsModel.find({ email: email }).then(async (user) => {
			if (!user.length) {
				await studentsModel.create({
					fname,
					lname,
					username,
					contact,
					email,
					age,
					gender,
					address,
					img,
					password,
				});
				studentsModel.find({ email: email }).then((response) => {
					res.status(200).json({
						status: true,
						message: "User successfully registered!",
						registeredData: response[0],
						type: "student",
					});
				});
			} else {
				res.status(200).json({
					status: false,
					errorName: "emailExist",
					message: "Email already exists",
				});
			}
		});
	} else {
		teachersModel.find({ email: email }).then(async (user) => {
			if (!user.length) {
				await teachersModel.create({
					fname,
					lname,
					username,
					contact,
					email,
					age,
					gender,
					address,
					img,

					password,
				});
				res.status(200).json({ status: true, msg: "Teacher registered" });
			} else {
				res
					.status(400)
					.json({ status: false, msg: "User email already exists" });
			}
		});
	}
}

module.exports = {
	loginUser,
	registerUser,
};
