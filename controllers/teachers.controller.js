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

function regStudent(req, res){
    const { fname, lname, username, contact, age, gender, password1} = req.body;
    const id = studentsModel.length
    if (!fname || !lname){
        !fname 
        ? res.status(404).json({msg: "Product Name cannot be empty"})
        : res.status(404).json({msg: "Product Quantity cannot be empty"})
    } else {  
        studentsModel.push({id, fname, lname, username, contact, age, gender, password1 });
        res.send(`${fname} is successfully added`);
    }
};

function getStudent(req, res){
    const id = Number(req.params.id);
    const getStudent = studentsModel.find(student => student.id === id)
    getStudent
            ? res.status(200).json(getStudent)
            : res.status(404).json({msg: "Sudent does not exist"})
}

module.exports = {
    getAllTeachers,
    getAllStudents,
    getStudent,
    regStudent
};