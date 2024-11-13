const express = require("express");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const app = express();

//global middleware configuration for json data
app.use(express.json());


//global middleware for routes configuration
app.use("/users", userRouter);
app.use("/auth", authRouter);

//serverhealth check
app.get("/", (req, res) => {
  res.json({manage: "server is Live."});
});


module.exports = app;