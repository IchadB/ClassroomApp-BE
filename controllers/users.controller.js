const studentsModel = require("../models/student_mongo");
const teachersModel = require("../models/teacher_mongo");

async function loginUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(200)
      .json({ status: false, msg: "All field must not be empty" });
  }

  const isStudent = await studentsModel.find({
    username: username,
    password: password,
  });
  if (!isStudent.length) {
    const isTeacher = await teachersModel.find({
      username: username,
      password: password,
    });
    !isTeacher.length
      ? res
          .status(200)
          .json({
            status: false,
            msg: "User not found. Invalid Credentials!...",
          })
      : res.status(200).json({
          status: true,
          msg: "Teacher verified",
          type: "teacher",
          registeredData: isTeacher[0],
        });
  } else {
    res.status(200).json({
      status: true,
      msg: "Student verified",
      type: "student",
      registeredData: isStudent[0],
    });
  }
}

function registerUser(req, res) {
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
  if (password !== password2) {
    return res
      .status(200)
      .json({ status: false, msg: "Password does not match" });
  }
  if (!type) {
    return res
      .status(200)
      .json({ status: false, msg: "Type must be specified" });
  }
  if (type === "student") {
    studentsModel.find({ email: email }).then(async (user) => {
      if (!user.length) {
        await studentsModel.create({
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
          type,
        });
        studentsModel.find({ email: email }).then((response) => {
          res.status(200).json({
            status: true,
            message: "User successfully registered!",
            registeredData: response[0],
            type: type,
          });
        });
      } else {
        res.status(200).json({
          status: false,
          errorName: "emailExist",
          message: "Email already exists",
        });
      }
    });
  } else {
    teachersModel.find({ email: email }).then(async (user) => {
      if (!user.length) {
        await teachersModel.create({
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
        res.status(200).json({
          status: true,
          msg: "Teacher registered",
          type: "teacher",
          teachersData: user[0],
        });
      } else {
        res
          .status(400)
          .json({ status: false, msg: "User email already exists" });
      }
    });
  }
}

const logoutUser = (req, res) => {
  res.status(200).json({ msg: "User Logout Successfully" });
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
};
