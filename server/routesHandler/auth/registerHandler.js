const User = require("../../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const registerHandler = asyncHandler(async (req, res) => {
  const { username, email, password, phoneNo } = req.body;
  console.log(req.body, "Commin Data");

  if (!username || !email || !password || !phoneNo) {
    res.status(400);
    throw new Error("All Fields are mandotery");
  }
  const existEmail = await User.findOne({ email });
  const existUserName = await User.findOne({ username });
  if (existEmail) {
    res.status(400);
    throw new Error("Email already exist");
  }
  if (existUserName) {
    res.status(400);
    throw new Error("Username already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
      phoneNo,
    });
    res.status(200).send("Register user Successfuly");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = { registerHandler };
