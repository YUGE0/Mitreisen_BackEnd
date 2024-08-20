const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  fname: {
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

const Train = mongoose.model("Train", trainSchema);

module.exports = Train;
