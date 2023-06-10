const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
<<<<<<< HEAD
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		required: true,
	},
	fname: {
		type: String,
		required: true,
	},
	contact: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	age: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
=======
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
>>>>>>> my-branch
});

module.exports = mongoose.model("Teachers", teacherSchema);
