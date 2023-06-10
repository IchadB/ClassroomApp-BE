const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
<<<<<<< HEAD
	fname: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	contact: {
		type: Number,
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
	age: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
=======
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
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
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
>>>>>>> my-branch
});

module.exports = mongoose.model("Students", studentSchema);
