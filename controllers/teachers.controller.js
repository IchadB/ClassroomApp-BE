const teacherModel = require("../models/teachers.model");
const studentsModel = require("../models/students.model");
const examsModel = require("../models/create_exam.model");

function getAllTeachers(req, res) {
  teacherModel === 0
    ? res
        .status(400)
        .json({ status: false, msg: "No Teacher/s registered yet" })
    : res.status(200).json({ status: true, teacher: teacherModel });
}

function getAllStudents(req, res) {
  studentsModel.length === 0
    ? res.status(400).json({ status: false, msg: "No students yet" })
    : res.status(200).json({ status: true, students: studentsModel });
}

function regStudent(req, res) {
  const {
    fname,
    lname,
    username,
    img,
    email,
    contact,
    age,
    gender,
    address,
    password,
    password2,
  } = req.body;
  const id = studentsModel.length;
  console.log(fname, lname, username, email);
  if (
    !fname ||
    !lname ||
    !username ||
    !img ||
    !email ||
    !contact ||
    !age ||
    !gender ||
    !address ||
    !password ||
    !password2
  ) {
    res.status(400).json({ status: false, msg: "Please fill out all fields" });
  } else if (password !== password2) {
    res.status(400).json({ msg: "Password does not match" });
  } else {
    studentsModel.push({
      id,
      fname,
      lname,
      email,
      username,
      contact,
      img,
      age,
      gender,
      address,
      password,
    });
    res.send(`${fname} is successfully added`);
  }
}

function getStudent(req, res) {
  const id = Number(req.params.id);
  const getStudent = studentsModel.find((student) => student.id === id);
  getStudent
    ? res.status(200).json(getStudent)
    : res.status(404).json({ msg: "Sudent does not exist" });
}

function createExamFirstPart(req, res) {
  const { subject, title, desc, examLength } = req.body;
  const id = examsModel.length;
  examsModel.push({ id, subject, title, desc, examLength });
}

function getExams(req, res) {
  res.json(examsModel);
}

function getExam(req, res) {
  const id = +req.params.id;
  const findExam = examsModel.find((exam) => exam.id === id);
  // const { subject, title, desc, examLength } = findExam;
  findExam
    ? res.status(200).json({ status: true, exam: findExam })
    : res.status(400).json({ status: false, msg: "Not found" });
}

function updateStudents(req, res) {
  const {
    id,
    fname,
    lname,
    email,
    username,
    contact,
    img,
    age,
    gender,
    address,
    password,
  } = req.body;
  const student = studentsModel.find((student) => student.id === id);
  if (
    fname ||
    lname ||
    username ||
    // img ||
    email ||
    contact ||
    age ||
    gender ||
    address ||
    password
  ) {
    student.fname = fname;
    student.lname = lname;
    student.username = username;
    // student.img = img;
    student.email = email;
    student.contact = contact;
    student.age = age;
    student.gender = gender;
    student.address = address;
    student.password = password;
    res.send("Student has been updated");
  } else {
    res.status(404).json({ msg: "Please provide name and quantity" });
  }
  // student
  //   ? res.status(200).json({ status: true, student: student })
  //   : res.status(400).json({ status: false, msg: "Student not found" });
}

module.exports = {
  getAllTeachers,
  getAllStudents,
  getStudent,
  regStudent,
  createExamFirstPart,
  getExams,
  getExam,
  updateStudents,
};
