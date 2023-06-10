const studentDB = require("../models/student_mongo");
const teachersDB = require("../models/teacher_mongo");
const examDB = require("../models/exam_mongo");
const { ObjectId } = require("bson");

// function getAllTeachers(req, res) {
// 	// teacherModel === 0
// 	// ? res
// 	//     .status(400)
// 	//     .json({ status: false, msg: "No Teacher/s registered yet" })
// 	// : res.status(200).json({ status: true});
// }

async function getAllStudents(req, res) {
  const students = await studentDB.find();
  res.status(200).json(students);
}

async function getAllTeachers(req, res) {
  const teachers = await teachersDB.find({});
  res.status(200).json(teachers);
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
    return res
      .status(400)
      .json({ status: false, msg: "Please fill out all fields" });
  } else if (password !== password2) {
    return res.status(400).json({ msg: "Password does not match" });
  }
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

function getStudent(req, res) {
  // const id = Number(req.params.id);
  // const getStudent = studentsModel.find((student) => student.id === id);
  // getStudent
  //   ? res.status(200).json(getStudent)
  //   : res.status(404).json({ msg: "Sudent does not exist" });
}

async function createExamFirstPart(req, res) {
  const { subject, title, desc, examLength } = req.body;

  if (subject || title || desc || examLength) {
    const exam = await examDB.create({
      subject: subject,
      title: title,
      desc: desc,
      examLength: examLength,
    });
    res.status(200).json(exam);
    // console.log(exam);
  } else {
    res.status(400).json({ status: false, msg: "Invalid " });
  }
}
async function createExamSecondPart(req, res) {
  const id = req.params.id;
  // const { subject, title, desc, examLength, questions } = req.body;
  // console.log(typeof questions);
  // console.log(typeof subject);

  // console.log(questions);
  // if (subject || title || desc || examLength) {
  const exam = await examDB.updateOne(
    { _id: id },
    req.body
    // {
    //   subject: subject,
    //   title: title,
    //   desc: desc,
    //   examLength: examLength,
    //   questions: questions,
    // }
  );
  res.status(200).json(exam);
  // console.log(exam);
  // } else {
  res.status(400).json({ status: false, msg: "Invalid " });
  // }
}
async function getExams(req, res) {
  const exam = await examDB.find();
  res.status(200).json(exam);
}

async function getExam(req, res) {
  const id = req.params.id;
  const exam = await examDB.find({ _id: id });
  // const { subject, title, desc, examLength } = findExam;
  res.status(200).json(exam);
}
async function deleteExam(req, res) {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    await examDB.deleteOne({ _id: id });
    res.status(200).json({ status: true, msg: "Exam is deleted" });
  } else {
    res.status(500).json({ status: false, msg: "Exam not found" });
  }
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
  createExamSecondPart,
  getExams,
  getExam,
  updateStudent,
  deleteStudent,
  deleteExam,
};
