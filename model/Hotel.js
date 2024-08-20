const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  url: {
    type: String,
  },
  desTo: {
    type: String,
  },
  services: {
    type: String,
  },
  price: {
    type: String,
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
