const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },

  lastName: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password:{
    type: String,
    required: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
    unique: true,
  },

  verificationTokenExpired: {
    type: Date,
    default: Date.now(),
  },
},
  {timestamps: true}
);

const User = mongoose.model("user", userSchema);
module.exports = User;