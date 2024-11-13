const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const {generateToken, verifyToken} = require("../helpers/jwtHelpers");
const {ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN} = require("../lib/index");
const { JWT_SECRET } = require("../lib");

//user login controller function
const loginUser = async (req, res) =>{
  const {email, password} = req.body

  try{
    const userWithEmailExit = await User.findOne({email});

  if(!userWithEmailExit){
    return res.status(404).json({error: "User with email does not Exist"});
  }


  if(!userWithEmailExit.isVerified){
    return res.status (403).json({error: "User Account is Not Verified"});
  }

  const passwordMatch = await bcrypt.compareSync(password, userWithEmailExist?.password);

  if(!passwordMatch){
    res.status(403).json({error: "Invalid Login credentials"})
  }

  //Generate refresh Token
const refreshToken = generateToken(jwtPayload, JWT_SECRET, REFRESH_TOKEN_EXPIRES_IN);

  //Generate access Token
const accessToken = generateToken(jwtPayload, JWT_SECRET, ACCESS_TOKEN_EXPIRES_IN);

//cookie Option
const cookieOptions = {
  expires: new Date(Date.now() + 3000),
  maxAge: 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

  return res.status(200).cookie("accessToken", accessToken, cookieOptions).json({message: "User Login Successfully"});


  }catch(error){
    res.status(500).json({error: "Server Error"});
  }
};


const logOutUser = async (req, res) => {
  try{

    res.clearCookie("accessToken").status(200).json({message: "User Logout Successfully."});

  }catch(error){
    res.status(500).json({error: "Server Error"});
  }
};


module.exports = {loginUser, logOutUser};