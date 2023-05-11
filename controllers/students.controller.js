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
    const findTeacher = teacherModel.find(teacher => teacher.username === username && teacher.password === password);

    if(findStudent){
        res.status(200).json({status: true, value: "Student"})
    } else if(findTeacher){
        res.status(200).json({status: true,  value: "Teacher"})
    } else {
        res.status(400).json({msg: "User not found"})
    }
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
        res.status(200).json({status: true})
    }
};


module.exports = {
    getAllTeachers,
    getAllStudents,
    loginStudent,
    regStudent
}