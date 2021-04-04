const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/gy4ez8", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
