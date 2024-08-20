const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  about: {
    type: String,
  },
  place: {
    type: String,
  },
  location:{
    type: String,
  },
  price: {
    type: String,
  },
});

const Tours = mongoose.model("Tours", tourSchema);

module.exports = Tours;
