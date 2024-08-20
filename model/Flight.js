const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  url: {
    type: String,
  },
  desFrom: {
    type: String,
  },
  desTo: {
    type: String,
  },
  departure: {
    type: String,
  },
  arrival: {
    type: String,
  },
  cla: {
    type: String,
  },
  services: {
    type: String,
  },
  duration: {
    type: String,
  },
  price: {
    type: String,
  },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
