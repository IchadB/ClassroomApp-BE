const studentDB = require("../models/student_mongo");
const teachersDB = require("../models/teacher_mongo");
const examDB = require("../models/exam_mongo");
const answeredExamDB = require("../models/answered_exam_mongo");
const studentAttendanceDB = require("../models/student_attendance_mongo");
const { ObjectId } = require("bson");

//get answered exams of student by Ferdie
async function getExamsOfStudent(req, res) {
  const answeredExams = await answeredExamDB.find();
  !answeredExams
    ? res.status(204).json({ status: false, msg: "No exams yet" })
    : res.status(200).json(answeredExams);
}

async function getAttendances(req, res) {
  const attendance = await studentAttendanceDB.find();
  !attendance
    ? res.status(204).json({ status: false, msg: "Nothing to show yet!" })
    : res.status(200).json(attendance);
}

async function getAllTeachers(req, res) {
  const teachers = await teachersDB.find();
  !teachers.length
    ? res.status(299).json({ status: false, msg: "No teachers registerd yet!" })
    : res.status(200).json(teachers);
}

async function getTeacher(req, res) {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const teacher = await teachersDB.findById({ _id: id });
    teacher
      ? res.status(200).json(teacher)
      : res.status(400).json({ status: false, msg: "Teacher not found!.." });
  } else {
    res.status(404).json({ status: false, msg: "Invalid URL..." });
  }
}

async function updateTeacher(req, res) {
  const id = req.params.id;
  const {
    lname,
    fname,
    email,
    username,
    contact,
    age,
    gender,
    address,
    password,
  } = req.body;
  if (
    !fname ||
    !lname ||
    !username ||
    !email ||
    !contact ||
    !age ||
    !gender ||
    !address ||
    !password
  ) {
    return res
      .status(400)
      .json({ status: false, msg: "Please fill out all fields!.." });
  }
  await teachersDB.findByIdAndUpdate(id, req.body);
  return res.status(200).json({ status: true, msg: "Teacher updated!.." });
}

async function getAllStudents(req, res) {
  const students = await studentDB.find();
  !students.length
    ? res.status(204).json({ status: false, msg: "No students registerd yet!" })
    : res.status(200).json(students);
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

  if (!subject || !title || !desc || !examLength) {
    return res
      .status(406)
      .json({ status: false, msg: "Please fill out all fields!.." });
  }
  if (!Number(examLength)) {
    return res
      .status(400)
      .json({ status: false, msg: "Only number allowed in exam length!.." });
  }
  const exam = await examDB.create(req.body);
  res
    .status(206)
    .json({ status: true, msg: "Exam first part created...", exam });
}

async function createExamSecondPart(req, res) {
  const id = req.params.id;

  const newExam = req.body;
  newExam.map((exam, index) => {
    if (
      !exam.question ||
      !exam.choice_a ||
      !exam.choice_b ||
      !exam.choice_c ||
      !exam.choice_d ||
      !exam.answer
    ) {
      return res
        .status(400)
        .json({ status: false, msg: "Please fill out all fields!.." });
    }
  });

  if (ObjectId.isValid(id)) {
    const exam = await examDB.updateOne({ _id: id }, { questions: req.body });
    exam.acknowledged
      ? res.status(201).json({ status: true, msg: "Exam created!" })
      : res
          .status(406)
          .json({ status: false, msg: "Please fill out all fields!..." });
  } else {
    res.status(400).json({ status: false, msg: "Invalid Request URI" });
  }
}

async function publishExam(req, res) {
  const id = req.params.id;

  const exam = await examDB.updateOne({ _id: id }, req.body);
  return res.status(200).json({ status: true, msg: "Exam now published" });
}

async function getExams(req, res) {
  const exams = await examDB.find().sort({ createdAt: -1 });
  !exams.length
    ? res.status(204).json({ status: false, msg: "No exams yet!" })
    : res.status(200).json(exams);
}

async function getExam(req, res) {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    const exam = await examDB.findById({ _id: id });
    exam
      ? res.status(200).json(exam)
      : res.status(400).json({ status: false, msg: "Exam does not exist!..." });
  } else {
    res.status(404).json({ status: false, msg: "Invalid Request URI" });
  }
}

async function deleteExam(req, res) {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const exams = await examDB.findByIdAndDelete({ _id: id });
    exams
      ? res.status(200).json({ status: true, msg: "Exam deleted!..." })
      : res.status(404).json({ status: false, msg: "Exam does not exist!..." });
  } else {
    res.status(400).json({ status: false, msg: "Invalid Request URI" });
  }
}

async function updateStudent(req, res) {
  const id = req.params.id;
  const {
    lname,
    fname,
    email,
    username,
    contact,
    age,
    gender,
    address,
    password,
  } = req.body;
  if (
    !fname ||
    !lname ||
    !username ||
    !email ||
    !contact ||
    !age ||
    !gender ||
    !address ||
    !password
  ) {
    return res
      .status(400)
      .json({ status: false, msg: "Please fill out all fields!.." });
  }
  await studentDB.findByIdAndUpdate(id, req.body);
  return res.status(200).json({ status: true, msg: "Student updated!.." });
}

async function deleteStudent(req, res) {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    await studentDB.deleteOne({ _id: id });
    res.status(200).json({ status: true, msg: "Student deleted" });
  } else {
    res.status(404).json({ status: false, msg: "Student not found" });
  }
}

module.exports = {
  getExamsOfStudent,
  getTeacher,
  getAllTeachers,
  getAllStudents,
  getStudent,
  createExamFirstPart,
  createExamSecondPart,
  getExams,
  getExam,
  publishExam,
  updateStudent,
  updateTeacher,
  deleteStudent,
  deleteExam,
  getAttendances,
};
