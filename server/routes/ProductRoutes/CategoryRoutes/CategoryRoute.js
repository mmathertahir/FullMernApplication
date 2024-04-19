const { authenticateToken } = require("../../../middleware/auth");
const {
  createCategory,
} = require("../../../routesHandler/productroutes/categories/createCategory");

const router = require("express").Router();

router.post("/createCategory",authenticateToken, createCategory);

module.exports = router;
