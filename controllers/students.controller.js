const teacherModel = require('../models/teachers.model');
const studentsModel = require('../models/students.model');

function getAllTeachers(req, res){
    !teacherModel
        ? res.status(400).json({msg: "No Teacher/s registered yet"})
        : res.json(teacherModel)
}

function getAllStudents(req, res){
    res.json(studentsModel)
}

function loginStudent(req, res){

    const { username, password } = req.body;
    const findStudent = studentsModel.find(student => student.username === username && student.password === password);
    !findStudent
        ? res.status(400).json({status: false, msg: "Login Failed"})
        : res.status(200).json({status: true})
}


module.exports = {
    getAllTeachers,
    getAllStudents,
    loginStudent
}