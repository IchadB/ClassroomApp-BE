const express = require("express");
const routes = express.Router();

const usersController = require("../controllers/users.controller");

routes.post("/login", (req, res) => {
  res.sendStatus(200);
});
routes.post("/register", usersController.registerUser);
routes.post("/logout", usersController.logoutUser);

module.exports = routes;
