const mongoose = require("mongoose");
const { DEFAULT_VALIDATION, URL } = require("../../helpers/mongooseValidators");

const protectSchema = new mongoose.Schema({
  numbersOfCalls: {
    type: Number,
    default: 0
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId
  },
});

const Protect = mongoose.model("protect", protectSchema);

module.exports = Protect;
