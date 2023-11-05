const jwt = require("jsonwebtoken");
const config = require("config");

const key = config.get("JWT_KEY"); 
// acceptedCallPerDay
const generateAuthToken = (user) => {
  const {isUserSourceAdmin, acceptedCallPerDay, _id, isBusiness, isAdmin, name } = user;
  const token = jwt.sign({isUserSourceAdmin, acceptedCallPerDay, _id, isBusiness, isAdmin, name }, key);
  return token;
};

const verifyToken = (tokenFromClient) => {
  try {
    const userDataFromPayload = jwt.verify(tokenFromClient, key);
    return userDataFromPayload;
  } catch (error) {
    return null;
  }
};

exports.generateAuthToken = generateAuthToken;
exports.verifyToken = verifyToken;
