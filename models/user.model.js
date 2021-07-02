const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: "This field is required.",
  },
  email: {
    type: String,
    required: "This field is required.",
  },
  password: {
    type: Number,
    required: "This field is required.",
  },
});

mongoose.model("User", userSchema);
