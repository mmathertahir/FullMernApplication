const jwt = require("jsonwebtoken");
const User = require("../models/user");

// const verifyToken = async (req, res, next) => {
//   if (req.headers.authorization?.startsWith("Bearer")) {
//     const token = req.headers.authorization.split(" ")[1];
//     try {
//       const verify = jwt.verify(token, process.env.ACCESS_TOKEN);
//       console.log(verify);
//       if (verify) {
//         req.user = await User.findById({ _id: verify.id })
//           .select("-password")
//           .select("-refreshToken");
//         if (req.user) {
//           next();
//         }
//         if (!req.user) {
//           res.status(500);
//           res.send("user not found");
//           return;
//         }
//       }
//       if (!verify) {
//         res.status(401);
//         res.send("User not authroized");
//       }
//     } catch (error) {
//       res.status(401);
//       res.send(error.message);
//     }
//   }
//   if (!req.headers.authorization) {
//     res.status(401);
//     res.send("No token, Not Authroized");
//   }
// };

const checkLogin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    req.isLoggedIn = false;
    req.json({ error: "Category already exists" });
  }
};

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   console.log("vvvvvv", token);

//   if (!token) {
//     req.isLoggedIn = false;

//     return next();
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
//     if (err) {
//       req.isLoggedIn = false;
//       return next();
//     }
//     req.isLoggedIn = true;
//     res.status("User Already Login");
//     req.user = user;
//     next();
//   });
// };

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("vvvvvv", token);

  if (!token) {
    req.isLoggedIn = false;
    return next(); // Proceed to the next middleware without sending a response
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      req.isLoggedIn = false;
      return next(); // Proceed to the next middleware without sending a response
    }
    req.isLoggedIn = true;
    req.user = user;
    // If you want to send a response indicating the user is already logged in, do it here
    // For example, you might want to send a status code and a message
    res.status(200).send("User Already Login");
    // Note: After sending a response, you typically don't call next() unless you have specific logic to handle it
  });
};

const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const isAdmin = req.user.isAdmin;
    console.log(req.user.isAdmin);
    if (!isAdmin) {
      res.status(401);
      throw new Error("You are not Admin");
    }

    if (isAdmin) {
      next();
    }
  });
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    const isAdmin = req.user.isAdmin;
    console.log(req.user._id);
    console.log(req.params.id);
    currentUserId = req.user._id.toString() == req.params.id ? true : false;
    console.log(currentUserId);
    if (isAdmin || currentUserId) {
      next();
    }
    if (!currentUserId) {
      res.status(401);
      throw new Error("Not Authoriozed");
    }
  });
};

module.exports = {
  authenticateToken,
  verifyTokenAdmin,
  verifyTokenAndAuthorization,
};
