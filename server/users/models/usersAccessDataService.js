const DB = process.env.DB || "MONGODB";
const User = require("./mongodb/User");
const RePassword = require("./../../movies/models/mongodb/RePassword");
const BadLogin = require("./mongodb/BadLogin");
const lodash = require("lodash");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleBadRequest } = require("../../utils/handleErrors");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1/business_movie_app";
const mongoose = require("mongoose");
const { number } = require("joi");
const nodemailer = require('nodemailer');

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({ email }); 
      if (user) throw new Error("User already registered");

      user = new User(normalizedUser);
      user = await user.save();

      user = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("registerUser new user not in mongodb");
};

const deleteBadLoginStatus = async (userId) => {
  let userTfHoursStatus = await BadLogin.findOne({ userId });

  let userToDelete = await BadLogin.findByIdAndDelete(userTfHoursStatus._id);

  return Promise.resolve(userTfHoursStatus);
}

// const schema = new mongoose.Schema({
//   userId: {
//     type: String,
//     unique: true,
//   },
//  email: {
//   type: String,
//   unique: true,
//   lowercase: true,
//   trim: true,
//  },
//  TFHoursInNumber: {
//   type: String,
//  },
//  firstBadLogIn: {
//   type: String,
//  },
//  secondBadLogin: {
//   type: String,
//  },
//  thirdBadLogin: {
//   type: String,
//  },
//  calculate: {
//   type: String,
//  }
// });
// const TestModel = mongoose.model('Test', schema);

const loginUser = async ({ email, password }) => { 
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({ email });
      let userTfHoursStatus = await BadLogin.findOne({ email });
      let currentTime = new Date();
      currentTime = currentTime.getTime();

      if (userTfHoursStatus && userTfHoursStatus.thirdBadLogin !== "waitingForData") {

       let userTfHoursStatus = await BadLogin.findOne({ email });
          let tfH = {
            "userId": user._id,
            "lastBadLogIn": userTfHoursStatus.thirdBadLogin,
            "status": "24 hours block",
          }
          return Promise.resolve(tfH);
    }
      if (!user)
        throw new Error("Authentication Error: Invalid email or password");

      const validPassword = comparePassword(password, user.password);
      if (!validPassword) {
        badLogin(email, password, user)
        return Promise.resolve("wrongpassword"); 
        // throw new Error("Authentication Error: Invalid email or password");
      }

      const token = generateAuthToken(user);
      return Promise.resolve(token);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("loginUser user not in mongodb");
};

const badLogin = async (email, password, user) => {
  if (DB === "MONGODB") {
    try {
      let userTfHoursStatus = await BadLogin.findOne({ email });

      if (!userTfHoursStatus){
          let currentTime = new Date();
          currentTime = currentTime.getTime();
          await mongoose.connect('mongodb://127.0.0.1/business_movie_app');
          await BadLogin.collection.insertOne({ 
            userId: user._id,
            email: user.email,
            TFHoursInNumber : 86400000,
            firstBadLogIn: currentTime,
            secondBadLogin: "waitingForData",
            thirdBadLogin: "waitingForData",
            // calculate: "waitingForDataToCalculate"
          });
          return
        }

        if (userTfHoursStatus.secondBadLogin == "waitingForData") {
          let currentTime = new Date();
          currentTime = currentTime.getTime();
          let userToChange = await BadLogin.findByIdAndUpdate(userTfHoursStatus._id, {
              userId: user._id,
              email: user.email,
              firstBadLogIn: userTfHoursStatus.firstBadLogIn,
              secondBadLogin: currentTime,
              thirdBadLogin: "waitingForData",
              // calculate: "waitingForDataToCalculate"
            }, 
            {
            new: true,
        });
      }

      if (userTfHoursStatus.thirdBadLogin == "waitingForData" && userTfHoursStatus.secondBadLogin !== "waitingForData") {
          let currentTime = new Date();
          currentTime = currentTime.getTime();
          let userToChange = await BadLogin.findByIdAndUpdate(userTfHoursStatus._id, {
              userId: user._id,
              email: user.email,
              firstBadLogIn: userTfHoursStatus.firstBadLogIn,
              secondBadLogin: userTfHoursStatus.secondBadLogin,
              thirdBadLogin: currentTime,
              // calculate: "waitingForDataToCalculate"
            }, 
            {
            new: true,
        });
      }
    } catch (error) {
      throw new Error("Error");
    }
  }
}

const TfHoursCheck = async (email, password) => {
  if (DB === "MONGODB") {
try {
     const user = await User.findOne({ email });
     let userTfHoursStatus = await BadLogin.findOne({ email });

      if (userTfHoursStatus) {
        // console.log(userTfHoursStatus)
      }
      if (userTfHoursStatus) {
        if (+userTfHoursStatus["calculate"] > 1 && +userTfHoursStatus["calculate"] < 86400000) {
          return Promise.resolve(userTfHoursStatus.calculate);
        }
      }

      let userToChange = await BadLogin.findByIdAndUpdate(user._id, {
        userId: user._id,
        email: user.email,
        firstBadLogIn: user.firstBadLogIn,
        secondBadLogin: user.secondBadLogin,
        thirdBadLogin: user.thirdBadLogin,
        calculate: currentTime-user.firstBadLogIn
      })
} catch (error) {
  throw new Error("Error");
}
}
}

const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = await User.find({}, { password: 0, __v: 0 });
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};

const changeUserPassword = async (newPassword, email) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({email: email });
      if (user) {
          let userId = user._id
          await User.findByIdAndUpdate(
            userId,
            {
              $set: { "password": newPassword },
            },
            { 
              new: true 
          })
      }
      return Promise.resolve("we did it");
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("Error");
};

const checkEmail = async (UserEmail) => {
  sendEmail(UserEmail)
};

const sendEmail = async (UserEmail) => {
      let counter = 0
if (DB === "MONGODB") {
try {
  const users = await User.find({}, { password: 0, __v: 0 });
  if (users) {
    for (let user of users) {
     if (user.email == UserEmail) {
         counter++
    // return Promise.resolve(users);
  } 
}
if (counter == 0) {
    return Promise.resolve("mail not exist");
} 
if (counter > 0) {
  let code = Math.floor(Math.random() * 999999) + 100000;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'moviesvotes@gmail.com',
      pass: 'oxizzrkfrgqanrlz'
    }
  });

  let mailOptions = {
    from: 'moviesvotes@gmail.com',
    to: `${UserEmail}`,
    subject: 'Verify your email - Movies Votes',
    text: `Verify your email, Here is your email verification code: ${code}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      saveCodeInDB(UserEmail, code)
      console.log('Email sent: ' + info.response);
    }
  });
      return Promise.resolve("please enter the code");
}
}
} catch (error) {
  error.status = 404;
  return Promise.reject(error);
}}
return Promise.resolve("get users not in mongodb");
};

const saveCodeInDB = async (UserEmail, code) => {
let isMailInDB = false
let codeId = ''
  if (DB === "MONGODB") {
    try {
      let email = await RePassword.find();
      if (email) {
          for (let mail of email) {
           if (mail.email == UserEmail) {
              //  console.log((mail.createdTime).getTime())
               isMailInDB = true
               codeId = mail._id
      }
    }
  } 

  if (isMailInDB == true) {
  let codeToChange = await RePassword.findByIdAndUpdate(codeId, {
    code: code,
    email: UserEmail,
    createdTime: new Date()
  }, 
  {
  new: true,
});
}

if (isMailInDB == false) {
    await RePassword.collection.insertOne({ 
        code: code,
        email: UserEmail,
        createdTime: new Date()
    });
    return
}
    } catch (error) {
      throw new Error("Error");
    }
  }
};

const checkCodeFromEmail = async (codeToCheck, emailToCheck) => {
  if (DB === "MONGODB") {
    try {
      let reCodeUser = await RePassword.findOne({email: emailToCheck });
      if (reCodeUser) {
          let currentTime = new Date();
          let timeThatLeft = (currentTime.getTime() - (reCodeUser.createdTime).getTime())
          if (timeThatLeft < 300000) {
          if ((reCodeUser.email == emailToCheck) && (reCodeUser.code == codeToCheck)) {
              return Promise.resolve("the code is right");
         } else {
           return Promise.resolve("the code is not right");
         }
          } else {
            return Promise.resolve("the time is over");
          }        
      }
    } catch (error) {
      throw new Error("Error");
    }
  }
};

const DeleteCodeFromDB = async (UserEmail) => {
  // console.log("Klugi")
  // console.log(UserEmail)

  // if (DB === "MONGODB") {
  //   try {
  //     let userTfHoursStatus = await BadLogin.findOne({ email });
      

  //   } catch (error) {
  //     throw new Error("Error");
  //   }
  // }
};

const getUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId, {
        password: 0,
        __v: 0,
      });
      if (!user) throw new Error("Could not find this user in the database");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const updateUser = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      let userToChange = await User.findByIdAndUpdate(userId, normalizedUser, {
        new: true,
      });

      if (!userToChange)
        throw new Error("A user with this ID cannot be found in the database");

      return Promise.resolve(userToChange);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("user updateUser not in mongodb");
};

const changeUserBusinessStatus = async (userId) => {
  // console.log("here")
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId)
      if (user.isBusiness == false) {
          user.isBusiness = true
        // console.log(false)

        let userToChange = await User.findByIdAndUpdate(userId, user, {
          new: true,
        });

      } else {
        user.isBusiness = false
        // console.log(true)

        let userToChange = await User.findByIdAndUpdate(userId, user, {
          new: true,
        });

      }
      //  user.isBusiness = false
      // return Promise.resolve(`user no. ${userId} change his business status!`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("its not in mongodb");
};

const changeUserAdminStatus = async (userId, status) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId)
      if (user.isAdmin == false) {
          user.isAdmin = true
        let userToChange = await User.findByIdAndUpdate(userId, user, {
          new: true,
        });
      } else {
        user.isAdmin = false
        let userToChange = await User.findByIdAndUpdate(userId, user, {
          new: true,
        });
      }
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("its not in mongodb");
};

const changeAcceptedVotesAmount = async (userId, acceptedVotes) => {
  // console.log("here")
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId)
      if (user.acceptedVotes) {
          user.acceptedVotes = acceptedVotes
        // console.log(false)

        let userToChange = await User.findByIdAndUpdate(userId, user, {
          new: true,
        });
      }
      //  user.isBusiness = false
      return Promise.resolve("The accepted votes is updated");
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("its not in mongodb");
};

const changeCallsAmount = async (callsLimit, userId) => {
  // console.log("Suli Buli")
  // console.log(userId)
  // console.log(callsLimit)  
  // console.log("here")
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId)
      if (user) {
          console.log("yes it is")
          user.acceptedCallPerDay = callsLimit
        // console.log(false)

        let userToChange = await User.findByIdAndUpdate(userId, user, {
          new: true,
        });
      }
      //  user.isBusiness = false
      return Promise.resolve("The accepted Calls is updated");
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("its not in mongodb");
};

const deleteUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId);
      if (!user)
        throw new Error("A user with this ID cannot be found in the database");

      userToDelete = await User.findByIdAndDelete(userId);

      return Promise.resolve(userToDelete);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("user deleted not in mongodb");
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.checkEmail = checkEmail;
exports.sendEmail = sendEmail;
exports.changeUserPassword = changeUserPassword;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.changeUserAdminStatus = changeUserAdminStatus;
exports.changeCallsAmount = changeCallsAmount;
exports.checkCodeFromEmail = checkCodeFromEmail;
exports.deleteUser = deleteUser;
exports.deleteBadLoginStatus = deleteBadLoginStatus
exports.changeAcceptedVotesAmount = changeAcceptedVotesAmount
