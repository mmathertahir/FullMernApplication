const router = require("express").Router();
const { verifyToken, authenticateToken } = require("../middleware/auth");
const { loginHandler } = require("../routesHandler/auth/loginHandler");
const { registerHandler } = require("../routesHandler/auth/registerHandler");

router.post("/login", authenticateToken, loginHandler);
router.post("/register", registerHandler);

module.exports = router;
