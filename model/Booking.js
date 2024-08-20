const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  book:{
    type: String,
  },
  uname:{
    type: String,
  },
  uemail:{
    type: String,
  },
  fname:{
    type: String,
  },
  desFrom:{
    type: String,
  },
  desTo:{
    type: String,
  },
  traveler:{
    type: String,
  },
  departure:{
    type: String,
  },
  arrival:{
    type: String,
  },
  cla:{
    type: String,
  },
  service:{
    type: String,
  },
  trip:{
    type: String,
  },
  price:{
    type: String,
  },
  date:{
    type: String,
  },
  dateFrom:{
    type: String,
  },
  dateTo:{
    type: String,
  },
  about:{
    type: String,
  },
  place:{
    type: String,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
