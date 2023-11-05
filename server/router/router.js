const express = require("express");
const router = express.Router();
const moviesRestController = require("../movies/routes/moviesRestController");
const { handleError } = require("../utils/handleErrors");
const usersRestController = require("../users/routes/usersRestController");
const Protect = require("../movies/models/mongodb/Protect");
const protectServer = require("../movies/models/mongodb/Protect");
// const protect = require("..//..//server//router//protectServer");

router.use("/movies", moviesRestController); 
router.use("/users", usersRestController);

router.use((req, res) => {
  handleError(res, 404, "Page not found!");
});

module.exports = router;
