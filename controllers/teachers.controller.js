const teacherModel = require('../models/teachers.model');
const studentsModel = require('../models/students.model');
const examsModel = require('../models/create_exam.model')

function getAllTeachers(req, res){
    !teacherModel
        ? res.status(400).json({msg: "No Teacher/s registered yet"})
        : res.json(teacherModel)
}

function getAllStudents(req, res){
    res.json(studentsModel)
}

function regStudent(req, res){
    const { fname, lname, username, contact, age, gender, address, password, password2 } = req.body;
    const id = studentsModel.length
    if (!fname || !lname || !username || !contact || !age || !gender || !address || !password || !password2){
        // !fname 
        // ? res.status(404).json({msg: "Product Name cannot be empty"})
        // : res.status(404).json({msg: "Product Quantity cannot be empty"})
        res.status(400).json({msg: "Please fill out all fields"});
    } else if(password !== password2){
        res.status(400).json({msg: "Password does not match"})
    } else {  
        studentsModel.push({id, fname, lname, username, contact, age, gender, address, password });
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

function createExamFirstPart(req, res){
    const { subject, title, desc, examLength } = req.body;
    const id = examsModel.length
    examsModel.push({id, subject, title, desc, examLength});

}

function getExams(req, res){
    res.json(examsModel)
}

function getExam(req, res){
    const id = +req.params.id
    const findExam = examsModel.find(exam => exam.id === id)
    const { subject, title, desc, examLength } = findExam
    findExam
        ? res.status(200).json({status: true, subject, title, desc, examLength})
        : res.status(400).json({status: false, msg: "Not found"})
}

module.exports = {
    getAllTeachers,
    getAllStudents,
    getStudent,
    regStudent,
    createExamFirstPart,
    getExams,
    getExam
};