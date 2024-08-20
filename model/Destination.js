const mongoose = require("mongoose");

const destSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  about: {
    type: String,
  },
  aboutext: {
    type: String,
  },
  location: {
    type: String,
  },
  bg:{ 
    type: String,
  },
  imgo:{ 
    type: String,
  },
  imgs:{ 
    type: String,
  },
  imgc:{ 
    type: String,
  },
  price: {
    type: String,
  },
});

const Destination = mongoose.model("Destination", destSchema);

module.exports = Destination;
