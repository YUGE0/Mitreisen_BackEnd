const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const cors = require('cors');
const { CURSOR_FLAGS } = require("mongodb");
require("dotenv").config();
const JWT = require("jsonwebtoken");
const app = express();

//Mail
const {sendTourEmail} = require("./Services/TourTicket");
const {sendFlightEmail} = require("./Services/FlightTicket");
const {sendTrainEmail} = require("./Services/TrainTicket");
const {sendHotelEmail} = require("./Services/HotelTicket");
const {sendNewsLEmail} = require("./Services/NewLetter");
app.use(cors());
app.use(bodyParser.json());

const URI = process.env.MONGODBCL;
mongoose.connect(URI)
.then(() => console.log("Connected to database"))
.catch((error) => {
  console.error("Error connecting to MongoDB Atlas:", error);
  process.exit(1); // Optional: Exit on connection failure
});
//import schema
const Flight = require("./model/Flight");
const Train = require("./model/train");
const Hotel = require("./model/Hotel");
const Destination = require("./model/Destination");
const Tours = require("./model/Tours");
const Place = require("./model/PopularPlace");
const Booking = require("./model/Booking");
const Signup = require("./model/signup");


//Flight
app.get("/getFlightData", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights)
    //console.log(flights)
  } catch (error) {
    console.error("Error retrieving flight data:", error);
    res.status(500).json({ message: "Error fetching flight data" });
  }
});
app.post("/addFlightData", async (req, res) => {
    const {fname,desFrom,desTo,departure,arrival,cla,services,duration,price,url} = req.body;
  
    try {
      const newData = new Flight({fname,desFrom,desTo,departure,arrival,cla,services,duration,price,url});
      await newData.save();
      res.status(201).json({ message: 'Data added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.delete("/delFlightData", async (req, res) => {
    const { fname,desFrom,desTo,departure,arrival } = req.body;
  
    try {
      const deletedTeam = await Flight.findOneAndDelete({ fname,desFrom,desTo,departure,arrival });
  
      if (deletedTeam) {
        console.log(`Flight with ${fname} deleted successfully`);
        res.json({ message: `Flight with Name:${fname} deleted successfully` });
      } else {
        res.status(404).json({ error: `Flight with name ${fname} not found` });
      }
    } catch (error) {
      console.error("Error deleting team:", error.message);
      res.status(500).json({ error: "Failed to delete team. Please try again later." });
    }
});
app.post("/seFlightData", async (req, res) => { 
  //console.log("Here")
  const {desFrom, desTo, cla} = req.body;
  //console.log(req.body);
  try {
    const data = await Flight.find({ desFrom, desTo, cla });
    res.send(data);
  } catch (error) {
    console.error("Error fetching flight data:", error);
    res.status(500).json({ message: "Error retrieving flight data" });
  }
});


//Train
app.get("/getTrainData", async (req, res) => {
  Train.find().then(member => res.json(member)).catch(er => res.json(er))
});
app.post("/addTrainData", async (req, res) => {
  const {fname,desFrom,desTo,departure,arrival,cla,services,duration,price,url} = req.body;

  try {
    const newData = new Train({fname,desFrom,desTo,departure,arrival,cla,services,duration,price,url});
    await newData.save();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.delete("/delTrainData", async (req, res) => {
  const { fname,desFrom,desTo,departure,arrival } = req.body;

  try {
    const deletedTeam = await Train.findOneAndDelete({ fname,desFrom,desTo,departure,arrival });

    if (deletedTeam) {
      console.log(`Flight with ${fname} deleted successfully`);
      res.json({ message: `Flight with Name:${fname} deleted successfully` });
    } else {
      res.status(404).json({ error: `Flight with name ${fname} not found` });
    }
  } catch (error) {
    console.error("Error deleting team:", error.message);
    res.status(500).json({ error: "Failed to delete team. Please try again later." });
  }
});
app.post('/seTrainData', async (req, res) => { 
  const {desFrom, desTo, cla} = req.body;
  //console.log(req.body);
  try {
    
  } catch (error) {
    
  }
  const data = await Train.find({desFrom,desTo,cla})
  //.then(member => res.json(member)).catch(er => res.json(er))
  console.log("it is called"+data)
  res.send(data)
});


//Hotel
app.get("/getHotelData", async (req, res) => {
  Hotel.find().then(member => res.json(member)).catch(er => res.json(er))
});
app.post("/addHotelData", async (req, res) => {
  const {fname,desTo,services,price,url} = req.body;

  try {
    const newData = new Hotel({fname,desTo,services,price,url});
    await newData.save();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.delete("/delHotelData", async (req, res) => {
  const { fname,desTo, } = req.body;

  try {
    const deletedTeam = await Hotel.findOneAndDelete({ fname,desTo, });

    if (deletedTeam) {
      console.log(`Flight with ${fname} deleted successfully`);
      res.json({ message: `Flight with Name:${fname} deleted successfully` });
    } else {
      res.status(404).json({ error: `Flight with name ${fname} not found` });
    }
  } catch (error) {
    console.error("Error deleting team:", error.message);
    res.status(500).json({ error: "Failed to delete team. Please try again later." });
  }
});
app.post('/seHotelData', async (req, res) => { 
  const {desTo,} = req.body;
  //console.log(req.body);
  const data = await Hotel.find({desTo,})
  //.then(member => res.json(member)).catch(er => res.json(er))
  console.log("it is called"+data)
  res.send(data)
});


//Destination
app.get("/getDestinationData", async (req, res) => {
  Destination.find()
  .then(member => res.json(member))
  .catch(error => {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error fetching destinations" }); // Send a generic error response to client
  });
});
app.post("/addDestinationData", async (req, res) => {
  const {fname,about,aboutext,location,bg,imgo,imgs,imgc,price} = req.body;

  try {
    const newData = new Destination({fname,about,aboutext,location,bg,imgo,imgs,imgc,price});
    await newData.save();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.delete("/delDestinationData", async (req, res) => {
  const {fname} = req.body;

  try {
    const deletedTeam = await Destination.findOneAndDelete({ fname });

    if (deletedTeam) {
      console.log(`Destination with ${fname} deleted successfully`);
      res.json({ message: `Destination with Name:${fname} deleted successfully` });
    } else {
      res.status(404).json({ error: `Destination with name ${fname} not found` });
    }
  } catch (error) {
    console.error("Error deleting team:", error.message);
    res.status(500).json({ error: "Failed to delete team. Please try again later." });
  }
});
app.post('/seDestinationData', async (req, res) => { 
  const {fname} = req.body;
  //console.log(req.body);
  const data = await Destination.find({fname})
  //.then(member => res.json(member)).catch(er => res.json(er))
  console.log("it is called")
  res.send(data)
});


//Popular Place
app.get("/getPPlaceData", async (req, res) => {
  Place.find().then(member => res.json(member)).catch(er => res.json(er))
});
app.post("/addPPlaceData", async (req, res) => {
  const {fname,about,location,imgc,imgl} = req.body;

  try {
    const newData = new Place({fname,about,location,imgc,imgl});
    await newData.save();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.delete("/delPPlaceData", async (req, res) => {
  const {fname} = req.body;

  try {
    const deletedTeam = await Place.findOneAndDelete({ fname });

    if (deletedTeam) {
      console.log(`Destination with ${fname} deleted successfully`);
      res.json({ message: `Destination with Name:${fname} deleted successfully` });
    } else {
      res.status(404).json({ error: `Destination with name ${fname} not found` });
    }
  } catch (error) {
    console.error("Error deleting team:", error.message);
    res.status(500).json({ error: "Failed to delete team. Please try again later." });
  }
});
app.post('/sePPlaceData', async (req, res) => { 
  const {location} = req.body;
  //console.log(req.body);
  const data = await Place.find({location})
  //.then(member => res.json(member)).catch(er => res.json(er))
  console.log("it is called")
  res.send(data)
});


//Tours
app.get("/getToursData", async (req, res) => {
  Tours.find().then(member => res.json(member)).catch(er => res.json(er))
});
app.post("/addToursData", async (req, res) => {
  const {fname,location,price,about,place} = req.body;
  console.log(req.body);
  try {
    const newData = new Tours({fname,location,price,about,place});
    await newData.save();
    //console.log(newData);
    res.status(201).json({ message: 'Data added successfully' });
    console.log(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.post('/seToursData', async (req, res) => { 
  const {location} = req.body;
  //console.log(req.body);
  const data = await Tours.find({location})
  //.then(member => res.json(member)).catch(er => res.json(er))
  console.log("it is called")
  res.send(data)
});
app.delete("/delToursData", async (req, res) => {
  const { fname } = req.body;

  try {
    const deletedTeam = await Tours.findOneAndDelete({ fname });

    if (deletedTeam) {
      console.log(`Flight with ${fname} deleted successfully`);
      res.json({ message: `Flight with Name:${fname} deleted successfully` });
    } else {
      res.status(404).json({ error: `Flight with name ${fname} not found` });
    }
  } catch (error) {
    console.error("Error deleting team:", error.message);
    res.status(500).json({ error: "Failed to delete team. Please try again later." });
  }
});


//Booking
app.get("/getBookingData", async (req, res) => {
  Booking.find().then(member => res.json(member)).catch(er => res.json(er))
});
app.post("/addBookingData", async (req, res) => {
  const {book,uname,fname,desFrom,desTo,traveler,departure,arrival,cla,service,trip,price,date,dateFrom,dateTo,about,place,uemail} = req.body;

  try {
    const newData = new Booking({book,uname,fname,desFrom,desTo,traveler,departure,arrival,cla,service,trip,price,date,dateFrom,dateTo,about,place,uemail});
    await newData.save();
    if(book==="Tour")
    {await sendTourEmail(book,uname,fname,desFrom,desTo,traveler,departure,arrival,cla,service,trip,price,date,dateFrom,dateTo,about,place,uemail);}
    else if(book==="Flight"){
      await sendFlightEmail(book,uname,fname,desFrom,desTo,traveler,departure,arrival,cla,service,trip,price,date,dateFrom,dateTo,about,place,uemail);
    }
    else if(book==="Train"){
      await sendTrainEmail(book,uname,fname,desFrom,desTo,traveler,departure,arrival,cla,service,trip,price,date,dateFrom,dateTo,about,place,uemail);
    }
    else if(book==="Hotel"){
      await sendHotelEmail(book,uname,fname,desFrom,desTo,traveler,departure,arrival,cla,service,trip,price,date,dateFrom,dateTo,about,place,uemail);
    }
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.delete("/delBookingData", async (req, res) => {
  const { book,fname } = req.body;

  try {
    const deletedTeam = await Booking.findOneAndDelete({ book,fname });

    if (deletedTeam) {
      console.log(`Flight with ${fname} deleted successfully`);
      res.json({ message: `Flight with Name:${fname} deleted successfully` });
    } else {
      res.status(404).json({ error: `Flight with name ${fname} not found` });
    }
  } catch (error) {
    console.error("Error deleting team:", error.message);
    res.status(500).json({ error: "Failed to delete team. Please try again later." });
  }
});


//Summary
app.get("/getSummaryData", async (req, res) => {
  Booking.find().then(member => res.json(member)).catch(er => res.json(er))
});
app.post('/seFlightSummary', async (req, res) => { 
  const {book} = req.body;
  const data = await Booking.find({book})
  const output = await Booking.countDocuments({ book });
  //console.log(output);
  //let c= count(data);
  //flightData = {"book":"Hello World","count":count}
  //.then(member => res.json(member)).catch(er => res.json(er))
  const summaryData = {
    bookings: data,
    count: output
  };
  res.send(summaryData)
});
app.post('/seTrainSummary', async (req, res) => { 
  const {book} = req.body;
  const data = await Booking.find({book})
  const output = await Booking.countDocuments({ book });
  //console.log(output);
  //let c= count(data);
  //flightData = {"book":"Hello World","count":count}
  //.then(member => res.json(member)).catch(er => res.json(er))
  const summaryData = {
    bookings: data,
    count: output
  };
  res.send(summaryData)
});
app.post('/seHotelSummary', async (req, res) => { 
  const {book} = req.body;
  const data = await Booking.find({book})
  const output = await Booking.countDocuments({ book });
  //console.log(output);
  //let c= count(data);
  //flightData = {"book":"Hello World","count":count}
  //.then(member => res.json(member)).catch(er => res.json(er))
  const summaryData = {
    bookings: data,
    count: output
  };
  res.send(summaryData)
});
app.post('/seTourSummary', async (req, res) => { 
  const {book} = req.body;
  const data = await Booking.find({book})
  const output = await Booking.countDocuments({ book });
  //console.log(output);
  //let c= count(data);
  //flightData = {"book":"Hello World","count":count}
  //.then(member => res.json(member)).catch(er => res.json(er))
  const summaryData = {
    bookings: data,
    count: output
  };
  res.send(summaryData)
});
app.get('/seToursSummary', async (req, res) => { 
  const output = await Tours.countDocuments({});
  const summaryData = {count: output};
  res.send(summaryData)
});
app.get('/seDestinationSummary', async (req, res) => { 
  const output = await Destination.countDocuments({});
  const summaryData = {count: output};
  res.send(summaryData)
});
app.get('/seUsersSummary', async (req, res) => { 
  const output = await Signup.countDocuments({});
  const summaryData = {count: output};
  res.send(summaryData)
});



//Login | Signup
app.post("/addSignupData", async (req, res) => {
  const {fname,email,mobile,pass} = req.body;
  let type = "user"
  try {
    const newData = new Signup({fname,email,mobile,type,pass});
    await newData.save();
    res.status(201).json({ message: 'Signup successfully' });
    log()
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.post('/seLoginData', async (req, res) => { 
  const {email,pass} = req.body;
  //console.log(req.body);
  const user = await Signup.findOne({email,pass})
  const output = await Signup.countDocuments({});
  console.log(output);
  //.then(member => res.json(member)).catch(er => res.json(er))
  //console.log("User exist"+data)
  if(user && user.pass === pass)
  { 
    const token = JWT.sign({userId: user._id},process.env.JWTKEY,{expiresIn:"2m"})
    res.status(201).json({ message: 'Login successfully',token: token,uname:user.fname,type:user.type});
  }
  else{
    res.status(404).json({ message: 'Login unsuccessfully' });
  }
});


//NewsLetter
app.post("/sendNewLetter", async (req, res) => {
  const {email} = req.body;
  await sendNewsLEmail(email);
});




//app
app.listen(process.env.BEPORT, () => {
    console.log(`Express server is running ${process.env.BEPORT}`);
  });



//additional / referense
// app.post('/addData', async (req, res) => {
//   const { pname, team } = req.body;

//   try {
//     // Create a new document using the DataModel
//     const newData = new Team({ pname, team, });
    
//     // Save the document to the database
//     await newData.save();

//     res.status(201).json({ message: 'Data added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
// app.delete("/team/del/:pname", async (req, res) => {
//     const { pname } = req.params;
  
//     try {
//       const deletedTeam = await Team.findOneAndDelete({ pname });
  
//       if (deletedTeam) {
//         console.log(`Team with ${pname} deleted successfully`);
//         res.json({ message: `Team with Name:${pname} deleted successfully` });
//       } else {
//         res.status(404).json({ error: `Team with name ${pname} not found` });
//       }
//     } catch (error) {
//       console.error("Error deleting team:", error.message);
//       res.status(500).json({ error: "Failed to delete team. Please try again later." });
//     }
// });
// app.post("/seFlightData", async (req, res) => {
//   const {desFrom,desTo,cla} = req.body;

//   try {
//     const newData = Flight.find({desFrom,desTo,cla});
//     //await newData.save();
//     //console.log(newData);
//     res.status(201).json({ message: 'Data Found successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });