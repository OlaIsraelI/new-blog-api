const express = require("express");
const userRouter = express.Router();
const{createNewUser, verifyUser} = require("../controllers/userControllers");


userRouter.post("/", createNewUser);
userRouter.put("/verify", verifyUser);


module.exports = userRouter;