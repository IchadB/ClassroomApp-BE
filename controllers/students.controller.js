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

function regStudent(req, res){
    const { fname, lname, username, contact, age, gender, password } = req.body;
    const id = studentsModel.length
    if (!fname || !lname){
        !fname 
        ? res.status(404).json({msg: "Product Name cannot be empty"})
        : res.status(404).json({msg: "Product Quantity cannot be empty"})
    } else {  
        studentsModel.push({id, fname, lname, username, contact, age, gender, password });
        res.send(`${fname} is successfully added`);
    }
};


module.exports = {
    getAllTeachers,
    getAllStudents,
    loginStudent,
    regStudent
}