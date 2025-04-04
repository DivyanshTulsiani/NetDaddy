import nodemailer from "nodemailer"
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail's SMTP server
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS
    }
});

export function sendEmail(email,reason){
    // Define email options
    const mailOptions = {
        from: process.env.GMAIL_ID,
        to: email,
        subject: 'Notification from NetPapa',
        text: `You are getting this email because ${reason}`
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}