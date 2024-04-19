const Category = require("../../../models/category");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;
  const createdBy = req.user.id;

  if (!createdBy || !categoryName) {
    return res
      .status(400)
      .json({ error: "Both createdBy and categoryName are mandatory fields" });
  }

  const existingCategory = await Category.findOne({ categoryName });
  if (existingCategory) {
    return res.status(400).json({ error: "Category already exists" });
  }

  try {
    const result = await Category.create({ createdBy, categoryName });
    return res
      .status(201)
      .json({ message: "Category created successfully", category: result });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to create category", details: error.message });
  }
});

module.exports = { createCategory };
