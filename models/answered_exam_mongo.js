const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const answeredSchema = new mongoose.Schema({
	subject: {
		type: String,
		required: true,
	},
	answer: {
		type: [],
		required: true,
	},
	studentId: {
		type: ObjectId,
		required: true,
	},
	examId: {
		type: ObjectId,
		required: true,
	},
	answeredAt: {
		type: Date,
		default: () => Date.now(),
	},
});

module.exports = mongoose.model("answeredExams", answeredSchema);
