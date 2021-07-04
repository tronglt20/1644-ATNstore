const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");

router.get("/", (req, res) => {
  res.render("product/addOrEdit", {
    viewTitle: "Insert Product",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else {
    console.log("update");
    updateRecord(req, res);
  }
});

router.get("/list", (req, res) => {
  Product.find((err, docs) => {
    if (!err) {
      res.render("product/list", {
        list: docs,
      });
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  }).lean();
});

router.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("product/addOrEdit", {
        viewTitle: "Update Product",
        product: doc,
      });
    }
  }).lean();
});
router.get("/delete/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/product/list");
    } else {
      console.log("Error in product delete :" + err);
    }
  });
});

function insertRecord(req, res) {
  var product = new Product();
  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  product.save((err, doc) => {
    if (!err) res.redirect("product/list");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("product/addOrEdit", {
          viewTitle: "Insert Product",
          product: req.body,
        });
      } else console.log("Error during record insertion : " + err);
    }
  });
}

function updateRecord(req, res) {
  Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
    if (!err) {
      res.redirect("product/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("product/addOrEdit", {
          viewTitle: "Update Product",
          product: req.body,
        });
      } else console.log("Error during record update : " + err);
    }
  });
}

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "name":
        body["nameError"] = err.errors[field].message;
        break;
      case "description":
        body["descriptionError"] = err.errors[field].message;
        break;
      case "price":
        body["priceError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

module.exports = router;
