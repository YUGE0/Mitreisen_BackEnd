const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  about: {
    type: String,
  },
  location:{
    type: String,
  },  
  imgc:{ 
    type: String,
  },
  imgs:{ 
    type: String,
  },
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
