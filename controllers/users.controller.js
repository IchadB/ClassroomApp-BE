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
    // console.log(isTeacher[0].fname);
    !isTeacher.length
      ? res.status(200).json({ status: false, msg: "User not found" })
      : res.status(200).json({
          status: true,
          msg: "Teacher verefied",
          type: "teacher",
          id: isTeacher[0]._id,
        });
  } else {
    res.status(200).json(
      {
        status: true,
        msg: "Student verefied",
        type: "student",
      },
      isStudent._id
    );
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
  if (type === "Student") {
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
        });
        res
          .status(200)
          .json({ status: true, message: "User successfully registered!" });
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
        res.status(200).json({ status: true, msg: "Teacher registered" });
      } else {
        res
          .status(400)
          .json({ status: false, msg: "User email already exists" });
      }
    });
  }
}

module.exports = {
  loginUser,
  registerUser,
};
