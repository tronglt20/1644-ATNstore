const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "This field is required.",
  },
  description: {
    type: String,
    required: "This field is required.",
  },
  price: {
    type: Number,
    required: "This field is required.",
  },
});

mongoose.model("Product", productSchema);
