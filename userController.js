const  bcrypt = require('bcryptjs');
const userModel = require("../models/userModel");

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({email : email})
    if(!user) return res.status(400).json({message : "User does not exist"})
    const isMatch  = await bcrypt.compare(password,user.password)
    if(!isMatch) return res.status(400).json({message : "Invalid Credentials"})
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const {name ,email,password} = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt)
    const newUser = new userModel({
      name,
      email,
      password : passwordHash,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
