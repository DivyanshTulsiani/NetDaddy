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

export function sendEmail(email){
    // Define email options
    const mailOptions = {
        from: process.env.GMAIL_ID,
        to: email,
        subject: 'Hello from Node.js',
        text: 'This is a test email sent from my Node.js app!',
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