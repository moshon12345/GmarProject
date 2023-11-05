const mongoose = require("mongoose");
const { DEFAULT_VALIDATION, URL } = require("../../helpers/mongooseValidators");

const rePasswordSchema = new mongoose.Schema({
  email: {
    type: String
  },
  code: {
    type: Number
  },
  createdTime: {
    type: Date
  },
});

const RePassword = mongoose.model("rePassword", rePasswordSchema);

module.exports = RePassword;
