const nodemailer = require('nodemailer');
require("dotenv").config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILEREMAIL,
    pass: process.env.NODEMAILERAPPPASWORD   
  }
});

let email = "yugprajapati32@gmail.com"

async function sendTourEmail(book,uname,fname,desFrom,desTo,traveler,departure,arrival,cla,service,trip,price,date,dateFrom,dateTo,about,place,uemail) {
  const mailOptions = {
    from: process.env.NODEMAILEREMAIL, 
    to: uemail,
    subject: `Thank you for Booking your ${book} with Mitreisen`,
    html:`
        <div>
            <h1>Successfully booked your ${book}</h1>
            <h3>Booking Date: ${date}</h3>
            <h3>Tour Name   : ${fname}</h3>
            <h3>Places : ${place}</h3>
            <h3>Tour Date : ${dateFrom}</h3>
            <h3>Price : ${price}</h3>
            <h4>About Tour :${about} </h4>
            <p>
            <b>Dear</b> ${uname},<br>
            Thank you for booking your travel with Mitreisen. 
            We appreciate your trust in us. Your upcoming journey is now set to be as seamless 
            as it is exciting. Safe travels, and we look forward to assisting you on future adventures.
            <br>Best,<br>
            Mitreisen</p>
        </div>
    `
    //text: 'Thank you for registering with our service. Book Flights,Hotel and Exiting Holiday packages\n on Budget Frandiely.\n\nEnjoy Holidays.\n\nBest regards,\n\nKD Travels.'
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("mail sent");
    //console.log(`Email sent to ${toEmail}`);
  } catch (error) {
    console.error(`Error sending email to ${error.message}`);
  }
}

module.exports = { sendTourEmail };
