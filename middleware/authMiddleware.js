const jwt = require("jsonwebtoken");
const teachersModel = require("../models/teacher_mongo.js");

const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await teachersModel
        .findById(decoded.userID)
        .select("-password");
      next();
    } catch (error) {
      res.status(401).json({ status: false, msg: "Invalid token!" });
    }
  } else {
    res.status(401).json({ status: false, msg: "Not authorized!" });
  }
};

module.exports = {
  protect,
};
