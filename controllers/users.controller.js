const studentsModel = require("../models/student_mongo");
const teachersModel = require("../models/teacher_mongo");
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: false, msg: "All field must not be empty" });
  }

  const teacher = await teachersModel.findOne({ email });
  const student = await studentsModel.findOne({ email });

  if (teacher && (await teacher.matchPassword(password))) {
    return res.status(200).json({
      registeredData: teacher,
      status: true,
      msg: "Teacher verified",
      type: "teacher",
      token: generateToken(teacher._id),
    });
  }
  if (student && (await student.matchPassword(password))) {
    return res.status(200).json({
      registeredData: student,
      status: true,
      msg: "Student verified",
      type: "student",
      token: generateToken(student._id),
    });
  }
  if (!student || !teacher) {
    return res.status(404).json({
      status: false,
      msg: "User not found!...",
    });
  }
}

async function registerUser(req, res) {
  const {
    fname,
    lname,
    username,
    contact,
    email,
    age,
    gender,
    address,
    img,
    password,
    password2,
    type,
  } = req.body;
  if (email.length)
    if (password !== password2) {
      return res
        .status(400)
        .json({ status: false, msg: "Password does not match" });
    }
  if (!type) {
    return res
      .status(400)
      .json({ status: false, msg: "Type must be specified" });
  }

  const teacher = await teachersModel.findOne({ email });
  const student = await studentsModel.findOne({ email });

  if (!teacher && !student) {
    if (type === "student") {
      const newStudent = await studentsModel.create({
        fname,
        lname,
        username,
        contact,
        email,
        age,
        gender,
        address,
        img,
        password,
      });
      return res.status(201).json({
        status: true,
        message: "Student successfully registered!",
        registeredData: newStudent,
        type: type,
        token: generateToken(newStudent._id),
      });
    } else if (type === "teacher") {
      const newTeacher = await teachersModel.create({
        fname,
        lname,
        username,
        contact,
        email,
        age,
        gender,
        address,
        img,
        password,
      });
      return res.status(201).json({
        status: true,
        message: "Teacher successfully registered!",
        registeredData: newTeacher,
        type: type,
        token: generateToken(newTeacher._id),
      });
    }
  } else {
    return res.status(400).json({ status: false, msg: "Email already exist!" });
  }
}

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
  });
  res.status(200).json({ msg: "User Logout Successfully" });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
};

// if (type === "student") {
//   studentsModel.find({ email: email }).then(async (user) => {
//     if (!user.length) {
//       await studentsModel.create({
//         fname,
//         lname,
//         username,
//         contact,
//         email,
//         age,
//         gender,
//         address,
//         img,
//         password,
//         type,
//       });
//       studentsModel.find({ email: email }).then((response) => {
//         res.status(200).json({
//           status: true,
//           message: "User successfully registered!",
//           registeredData: response[0],
//           type: type,
//         });
//       });
//     } else {
//       res.status(200).json({
//         status: false,
//         errorName: "emailExist",
//         message: "Email already exists",
//       });
//     }
//   });
// } else {
//   teachersModel.find({ email: email }).then(async (user) => {
//     if (!user.length) {
//       await teachersModel.create({
//         fname,
//         lname,
//         username,
//         contact,
//         email,
//         age,
//         gender,
//         address,
//         img,
//         password,
//       });
//       generateToken(res, user._id);
//       res.status(200).json({
//         status: true,
//         msg: "Teacher registered",
//         type: "teacher",
//         teachersData: user[0],
//       });
//     } else {
//       res
//         .status(400)
//         .json({ status: false, msg: "User email already exists" });
//     }
//   });
// }
