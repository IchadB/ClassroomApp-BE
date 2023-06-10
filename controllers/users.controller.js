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
				password2,
				type,
			});
			res
				.status(200)
				.json({ status: true, message: "User successfully registered!" });
		} else {
			res.status(200).json({
				status: false,
				errorName: "emailExist",
				message: "Email already exists",
			});
		}
	});
}

module.exports = {
	loginUser,
	registerUser,
};
