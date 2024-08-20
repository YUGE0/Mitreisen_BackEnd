const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  email: {
    type: String,
  },
  type: {
    type: String,
  },
  pass: {
    type: String,
  },
});

const Signup = mongoose.model("Signup", signupSchema);

module.exports = Signup;
