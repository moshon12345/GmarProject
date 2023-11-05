const express = require("express");
const auth = require("../../auth/authService");
const protectServer = require("../../auth/Providers/protectServer");
const { handleError } = require("../../utils/handleErrors");
const { generateUserPassword } = require("../helpers/bcrypt");
const normalizeUser = require("../helpers/normalizeUser");
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  changeUserBusinessStatus,
  deleteBadLoginStatus,
  deleteUser,
  changeAcceptedVotesAmount,
  changeUserAdminStatus,
  changeCallsAmount,
  checkEmail,
  sendEmail,
  checkCodeFromEmail,
  changeUserPassword,
} = require("../models/usersAccessDataService");

const {
  validateRegistration,
  validateLogin,
  validateUserUpdate,
} = require("../validations/userValidationService");
const User = require("../models/mongodb/User");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let user = req.body;
    const { error } = validateRegistration(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    user = normalizeUser(user);
    user.password = generateUserPassword(user.password);

    user = await registerUser(user);
    return res.status(201).send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/login",protectServer, async (req, res) => {
  try {
    let user = req.body;
    const { error } = validateLogin(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const token = await loginUser(req.body);
    return res.send(token);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:email", async (req, res) => {
  // console.log(req.params.email)
  try {
    const users = await sendEmail(req.params.email);
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/UserReP", async (req, res) => {
  // user.password = generateUserPassword(user.password);
  let password = generateUserPassword(req.body[0]);
  let email = req.body[1]
  try {
    const users = await changeUserPassword(password, email);
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/code/:codeToCheck/:email", async (req, res) => {
  const code = req.params.codeToCheck
  const email = req.params.email
  try {
    const users = await checkCodeFromEmail(code, email);
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id",protectServer, auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, isAdmin } = req.user;

    if (_id !== id && !isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin type user or the registered user to see this user details"
      );

    const user = await getUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id",protectServer, async (req, res) => {

  try {
    const { id } = req.params;
    let user = req.body;
    const { error } = validateUserUpdate(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    user = user[0]
    user = normalizeUser(user);
    user.password = generateUserPassword(user.password);

    user = await updateUser(id, user);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/:id/:acceptedVotes",protectServer, async (req, res) => {
  // console.log(req.params.id)
  // console.log(req.params.acceptedVotes)
  try {
    const user = await changeAcceptedVotesAmount(req.params.id, req.params.acceptedVotes);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/calls/:id/:callsLimit",protectServer, async (req, res) => {
  try {
    const user = await changeCallsAmount(req.params.id, req.params.callsLimit);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/admin/:userID/:status",protectServer, async (req, res) => {

  // const ip = 
  // req.headers['cf-connecting-ip'] ||  
  // req.headers['x-real-ip'] ||
  // req.headers['x-forwarded-for'] ||
  // req.socket.remoteAddress || '';

  // console.log (res)

  let userID = req.params.userID
  let userStatus = req.params.status
  try {
    const user = await changeUserAdminStatus(userID, userStatus);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id",protectServer, async (req, res) => {
  const userId = req.params["id"]
  try {
    const user = await deleteUser(userId);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/delete24/:id",protectServer, async (req, res) => {
  const userId = req.params["id"]
  try {
    const user = await deleteBadLoginStatus(userId);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
