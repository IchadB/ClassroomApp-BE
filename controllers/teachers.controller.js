const studentDB = require("../models/student_mongo");
const teachersDB = require("../models/teacher_mongo");
const examDB = require("../models/exam_mongo");
const { ObjectId } = require("bson");

function getAllTeachers(req, res) {
  // teacherModel === 0
  // ? res
  //     .status(400)
  //     .json({ status: false, msg: "No Teacher/s registered yet" })
  // : res.status(200).json({ status: true});
}

async function getAllStudents(req, res) {
  const students = await studentDB.find();
  res.status(200).json(students);
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
    studentDB.find({ email: email }).then(async (user) => {
      if (!user.length) {
        await studentDB.create({
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
        res.status(200).json({ status: true, msg: "User registered" });
      } else {
        res.status(200).json({ status: true, msg: "User already exist" });
      }
    });
  }
}

function getStudent(req, res) {
  // const id = Number(req.params.id);
  // const getStudent = studentsModel.find((student) => student.id === id);
  // getStudent
  //   ? res.status(200).json(getStudent)
  //   : res.status(404).json({ msg: "Sudent does not exist" });
}

function createExamFirstPart(req, res) {
  // const { subject, title, desc, examLength } = req.body;
  // const id = examsModel.length;
  // if (subject || title || desc || examLength) {
  //   examsModel.push({ id, subject, title, desc, examLength });
  //   res.status(200).json({ status: true, msg: "Exam first part created" });
  // } else {
  //   res.status(400).json({ status: false, msg: "Invalid " });
  // }
}

function getExams(req, res) {
  // res.json(examsModel);
}

function getExam(req, res) {
  // const id = +req.params.id;
  // const findExam = examsModel.find((exam) => exam.id === id);
  // // const { subject, title, desc, examLength } = findExam;
  // findExam
  //   ? res.status(200).json({ status: true, exam: findExam })
  //   : res.status(400).json({ status: false, msg: "Not found" });
}

async function updateStudent(req, res) {
  const id = req.params.id;
  const {
    fname,
    lname,
    email,
    username,
    contact,
    // img,
    age,
    gender,
    address,
    password,
  } = req.body;
  const student = await studentDB.findByIdAndUpdate(id, {
    fname: fname,
    lname: lname,
    email: email,
    username: username,
    contact: contact,
    // img,
    age: age,
    gender: gender,
    address: address,
    password: password,
  });
  res.status(200).json({ msg: "Student updated", student });
  // if (
  //   fname ||
  //   lname ||
  //   username ||
  //   // img ||
  //   email ||
  //   contact ||
  //   age ||
  //   gender ||
  //   address ||
  //   password
  // ) {
  //   student.id = id;
  //   student.fname = fname;
  //   student.lname = lname;
  //   student.username = username;
  //   // student.img = img;
  //   student.email = email;
  //   student.contact = contact;
  //   student.age = age;
  //   student.gender = gender;
  //   student.address = address;
  //   student.password = password;
  //   student.save();
  //   res.send("Student has been updated");
  // } else {
  //   res.status(404).json({ msg: "Please provide name and quantity" });
  // }
  // student
  //   ? res.status(200).json({ status: true, student: student })
  //   : res.status(400).json({ status: false, msg: "Student not found" });
}

async function deleteStudent(req, res) {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    await studentDB.deleteOne({ _id: id });
    res.status(200).json({ status: true, msg: "Student is deleted" });
  } else {
    res.status(500).json({ status: false, msg: "Student not found" });
  }
}

module.exports = {
  getAllTeachers,
  getAllStudents,
  getStudent,
  regStudent,
  createExamFirstPart,
  getExams,
  getExam,
  updateStudent,
  deleteStudent,
};
