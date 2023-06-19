const mongoose = require("mongoose");
// const MONGO_URL =
//   "mongodb+srv://IchadB:ichadB@cluster0.2epkefm.mongodb.net/ClassroomAppDB?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // mongoose.connection.once("open", () => {
    console.log(`Mongo DB Connected: ${conn.connection.host}`);
    //   });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
