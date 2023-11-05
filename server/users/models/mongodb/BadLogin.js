const mongoose = require("mongoose");
const Address = require("./Address");
const Image = require("./Image");
const Name = require("./Name");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
 email: {
  type: String,
  unique: true,
  lowercase: true,
  trim: true,
 },
 TFHoursInNumber: {
  type: String,
 },
 firstBadLogIn: {
  type: String,
 },
 secondBadLogin: {
  type: String,
 },
 thirdBadLogin: {
  type: String,
 },
 calculate: {
  type: String,
 }
});

const BadLogin = mongoose.model('BadLogin', schema);

module.exports = BadLogin;
