const studentsModel = require("../models/student_mongo");

function getAllStudents(req, res) {
	studentsModel.find().then((students) => {
		!students.length
			? res.status(200).json({ status: false, message: "Students not found!" })
			: res.status(200).json(students);
	});
}

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

module.exports = {
	getAllStudents,
	regStudent,
};
