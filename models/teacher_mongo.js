const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
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
});
// fname: "Richard",
//     lname: "Betalmos",
//     username: "IchadB",
//     email: "ichad@gmail.com",
//     contact: 09925235991,
//     gender: "Male",
//     age: 30,
//     password: "1234ichad",
module.exports = mongoose.model("Teachers", teacherSchema);
