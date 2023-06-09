function getAllTeachers(req, res) {
  // !teacherModel
  //   ? res
  //       .status(200)
  //       .json({ status: false, msg: "No Teacher/s registered yet" })
  //   : res.status(200).json({ status: true, teacher: teacherModel });
}

function getAllStudents(req, res) {
  res.json(studentsModel);
}

function loginUser(req, res) {
  const { username, password } = req.body;
  const findStudent = studentsModel.find(
    (student) => student.username === username && student.password === password
  );
  const findTeacher = teacherModel.find(
    (teacher) => teacher.username === username && teacher.password === password
  );

  if (findStudent) {
    return res.status(200).json({ status: true, value: "Student" });
  } else if (findTeacher) {
    return res.status(200).json({ status: true, value: "Teacher" });
  } else {
    return res.status(200).json({ status: false, msg: "User not found" });
  }
}

function regStudent(req, res) {
  const {
    fname,
    lname,
    username,
    contact,
    age,
    gender,
    address,
    password,
    password2,
  } = req.body;
  const id = studentsModel.length;

  if (
    !fname ||
    !lname ||
    !username ||
    !contact ||
    !age ||
    !gender ||
    !address ||
    !password ||
    !password2
  ) {
    res.status(400).json({ msg: "Please fill out all fields" });
  } else if (password !== password2) {
    res.status(400).json({ msg: "Password does not match" });
  } else {
    studentsModel.push({
      id,
      fname,
      lname,
      username,
      contact,
      age,
      gender,
      address,
      password,
    });
    res.status(200).json({ status: true });
  }
}

function registerStudents(req, res) {
  // const {
  //   fname,
  //   lname,
  //   username,
  //   contact,
  //   age,
  //   email,
  //   gender,
  //   address,
  //   password,
  //   password2,
  // } = req.body;
  // studentsModel.push({
  //   fname,
  //   lname,
  //   username,
  //   contact,
  //   age,
  //   email,
  //   gender,
  //   address,
  //   password,
  //   password2,
  // });
}

module.exports = {
  getAllTeachers,
  getAllStudents,
  loginUser,
  regStudent,
  studentsAttendance,
};
