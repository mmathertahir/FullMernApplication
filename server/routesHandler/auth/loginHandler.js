const User = require("../../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { genrateAccessToken } = require("../../controller/genrateToken");
const { genrateRefreshToken } = require("../../controller/genrateToken");

const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All field are required");
  }
  const result = await User.findOne({ email });

  if (!result) {
    res.status(401);
    throw new Error("User not Exist");
  }
  if (result) {
    const { password, refreshToken, ...others } = result._doc;

    const checkPassword = await bcrypt.compare(req.body.password, password);
    if (checkPassword) {
      const refreshToken = genrateRefreshToken(result._id, result.isAdmin);
      await User.findByIdAndUpdate(result._id, { refreshToken });
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 24,
      });

      const accessToken = genrateAccessToken(result._id);
      res.set("Authorization", `Bearer ${accessToken}`);

      res.status(200).json({
        ...others,
        token: genrateAccessToken(result._id, result.isAdmin),
      });
      return;
    }
    if (!checkPassword) {
      res.status(401);
      throw new Error("Please enter correct Password");
    }
  }
});

module.exports = { loginHandler };
