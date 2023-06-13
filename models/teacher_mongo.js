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
  img: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  joinedDate: {
    type: Date,
    default: () => Date.now(),
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
>>>>>>> 746d131071f93a6d624f92337fbd3be3bf79503d
});

module.exports = mongoose.model("Teachers", teacherSchema);
