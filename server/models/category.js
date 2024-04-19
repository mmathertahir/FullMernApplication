const mongoose = require("mongoose");
const User = require("./user");

const categorySchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  categoryName: {
    type: String,
    required: [true, "Category Name  is required"],
  },
});

module.exports = mongoose.model("Categories", categorySchema);
