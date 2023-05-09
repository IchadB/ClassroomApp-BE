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


module.exports = {
    getAllTeachers,
    getAllStudents
}