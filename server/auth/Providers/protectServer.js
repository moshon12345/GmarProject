const Protect = require("..//..//..//server//movies//models//mongodb//Protect");
const DB = process.env.DB || "MONGODB";

const protectServer = async (id, req, res, next) => { 
  console.log("Protected")
  // console.log(req.params)
  // console.log(req.body)

  return next(); 

  // if (DB === "MONGODB") {
  //   try {
  //     let user = await Protect.findOne({ email });
  //     if (!user) {
  //       await mongoose.connect('mongodb://127.0.0.1/business_movie_app');
  //       await Protect.collection.insertOne({ 
  //         userId: user._id,
  //         email: user.email,
  //         calls: 1
  //       });
  //     }
  //     return next()
  //   } catch (error) {
  //     error.status = 404;
  //     return handleBadRequest("Mongoose", error);
  //   }
  // }
  // return Promise.resolve("Error");
};

module.exports = protectServer;