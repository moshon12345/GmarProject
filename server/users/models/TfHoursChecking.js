const DB = process.env.DB || "MONGODB";
const User = require("./mongodb/User");
// const TestModel = require("./mongodb/BadLogin");
const lodash = require("lodash");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleBadRequest } = require("../../utils/handleErrors");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1/business_movie_app";
const mongoose = require("mongoose");

const TfHoursCheck = async (email, password) => {
  // if (DB === "MONGODB") {
    
  // }
  // console.log(email)
  // console.log(password)
  // console.log("Kugi")
  }

exports.TfHoursCheck = TfHoursCheck;
