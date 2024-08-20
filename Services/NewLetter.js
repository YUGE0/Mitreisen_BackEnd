const nodemailer = require('nodemailer');
require("dotenv").config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILEREMAIL,
    pass: process.env.NODEMAILERAPPPASWORD   
  }
});


async function sendNewsLEmail(email) {
  const mailOptions = {
    from: process.env.NODEMAILEREMAIL, 
    to: email,
    subject: `Thank you for Subscribing Mitreisen new letter`,
    html:`
    <div>
    <b>Dear</b> User, <br>
    Thank you for Subscribing to Mitreisen news letter. 
    We appreciate your trust in us. Your upcoming journey is now set to be as seamless 
    as it is exciting. Safe travels, and we look forward to assisting you on future adventures.
    <br><br>Best,<br>
    <b>Mitreisen</b></p>
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

module.exports = { sendNewsLEmail };
