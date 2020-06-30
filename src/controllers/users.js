const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error
    });
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Email or password is incorrect"
      });
    }
    const passwordMatch = bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        error: "Email or password is incorrect"
      });
    }
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
    res.header("auth-token", token);
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      error
    });
  }
};
