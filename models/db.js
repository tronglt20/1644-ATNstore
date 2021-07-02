const mongoose = require("mongoose");

const url = "mongodb+srv://admin:Abc@@123@a2-1644-website.cpnk8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

require("./product.model");
require("./user.model");
