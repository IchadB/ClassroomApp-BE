const express = require("express");
const routes = express.Router();

const usersController = require("../controllers/users.controller");

routes.post("/login", usersController.loginUser);
routes.post("/register", usersController.registerUser);

module.exports = routes;
