const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect("mongodb://127.0.0.1/business_movie_app")
  .then(() => console.log(chalk.magentaBright.bold("connected to MongoDb Locally!")))
  .catch(error =>
    console.log(chalk.redBright.bold(`could not connect to mongoDb: ${error}`))
  );