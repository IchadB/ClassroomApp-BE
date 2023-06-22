const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/database");
const PORT = process.env.PORT || 5000;

const teacherRouter = require("./routes/teachers.routes");
const studentsRouter = require("./routes/students.routes");
const usersRouter = require("./routes/users.routes");

dotenv.config();
connectDB();

app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.json());

app.use(
  cors({
    origin: "https://classroom-app-fe.vercel.app",
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Credentials",
    ],
  })
);

app.use("/teachers", teacherRouter);
app.use("/students", studentsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));

// middleware logger
// app.use((req, res, next) => {
//   const start = Date.now();
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
//   const delta = Date.now() - start;
//   console.log(`${req.method} ${req.url} ${delta}ms`);
// });

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
