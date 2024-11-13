const mongoose = require("mongoose");

//connect to mongoDB database
const connectDb = async() => {
  await mongoose.connect("mongodb://localhost:27017/blog-api")
  .then(() => console.log("Database Connected"))
  .catch(() => console.log(error));
}

module.exports = connectDb;