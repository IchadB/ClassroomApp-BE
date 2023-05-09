const express = require('express');
let path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const teacherRouter = require('./routes/teachers.routes');
const studentsRouter = require('./routes/students.routes')
app.use(express.json());

// middleware logger
app.use((req, res, next) => {
    const start = Date.now();
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:57524');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');  
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.use('/teachers', teacherRouter)
app.use('/students', studentsRouter)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));