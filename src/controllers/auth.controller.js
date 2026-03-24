require("dotenv").config();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { username, email, password, role = "user" } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExist) {
    return res
      .status(400)
      .json({ message: "Email or username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

const user = await userModel.create({
  username,
  email,
  password: hashedPassword,
  role, 
});
console.log("Created User:", user);

const token = jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "6d" },
);

res
  .cookie("token", token)
  .status(201)
  .json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    },
  });
}

async function login(req, res) {
  const { username, email, password } = req.body; 

    const user = await userModel.findOne({ 
        $or: [{ email }, { username }]
     });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
3
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role , username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "6d" },
    );

    res
      .cookie("token", token)
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
}



module.exports = {
  register,
  login,

};
