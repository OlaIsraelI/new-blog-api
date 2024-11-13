const express = require("express");
const authRouter = express.Router();
const {loginUser, logOutUser} = require("../controllers/authControllers");


authRouter.post("/login", loginUser);

module.exports = authRouter;