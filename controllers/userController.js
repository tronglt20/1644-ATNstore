const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/", (req, res) => {
  insertRecord(req, res);
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  checkLogin(req, res);
});

async function checkLogin(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await User.findOne({ email: email });
    if (userEmail?.password == password) {
      console.log("Pw correct");
      res.redirect("/product");
    } else {
      res.render("login");
      console.log("Password are not correct");
    }
  } catch (err) {
    console.log(err);
  }
}

function insertRecord(req, res) {
  var user = new User();
  user.fullname = req.body.fullname;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, doc) => {
    if (!err) res.render("login");
    else {
      if (err.name == "ValidationError") {
        res.render("signup");
      } else console.log("Error during record insertion : " + err);
    }
  });
}

module.exports = router;
