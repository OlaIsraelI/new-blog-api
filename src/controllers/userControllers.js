const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const generateOtp = require("../helpers/generateRandomToken");

// Create new user
const createNewUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({ error: "User with email already exists" });
    }

    // Generate a new OTP || verification token
    const verificationToken = generateOtp();

    // Hash the provided password for the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    let currentDate = new Date();
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresIn: currentDate.setHours(currentDate.getHours() + 1),
    });

    await newUser.save();

    // Send a verification email to the created user
    return res.status(201).json({ message: "User created successfully!", newUser });

  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Server Error." });
  }
  
};


//Verify User Controller Function
const verifyUser = async(req, res) => {
  const {verificationToken} = req.body;
  try{
    const userExistForVerification = await User.findOne({verificationToken});

    if(!userExistForVerification){
      return res.status(404).json({error: "Invalid Verification Token"});
    }

    if(new Date() - userExistForVerification?.verificationTokenExpired >= 60 * 60 * 1000){
      await User.findByIdAndDelete(userExistForVerification._id.toString());

      return res.status(403).json({error: "expired Verifictaion Token"});
    }

    userExistForVerification.verificationToken = undefined;
    userExistForVerification.verificationTokenExpiresIn = undefined;
    userExistForVerification.isVerified = true;

    await userExistForVerification.save();

    return res.status(200).json({message: "User Verified Successfully"});

  }catch(error){
    res.status(500).json({error: "Server Error"});
  }
}; 

module.exports = { createNewUser, verifyUser };
