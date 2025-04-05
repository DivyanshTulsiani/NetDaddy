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
const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NetDaddy Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="background-color: #4361ee; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">NetDaddy Alert</h1>
              <p style="color: #ffffff; margin: 5px 0 0; font-size: 14px;">Keeping Your Child Safe Online</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; color: #333333;">
              <h2 style="font-size: 20px; margin: 0 0 15px;">Hello Parent,</h2>
              <p style="font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                We’re reaching out because NetDaddy detected potentially unsafe content while your child was browsing. Here’s what we found:
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                <tr>
                  <td>
                    <strong style="font-size: 16px;">Reason:</strong>
                    <p id="reason" style="font-size: 16px; margin: 5px 0 0; color: #555555;">{{reason}}</p>
                  </td>
                </tr>
              </table>
              <p style="font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                This alert was triggered on <span id="date" style="font-weight: bold;">{{date}}</span> at <span id="time" style="font-weight: bold;">{{time}}</span>. You can review your child’s browsing activity or adjust SafePeek settings anytime.
              </p>
              <a href="https://yourwebsite.com/dashboard" style="display: inline-block; padding: 12px 25px; background-color: #4361ee; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">View Details</a>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #777777;">
              <p style="margin: 0 0 10px;">NetDaddy | Protecting Kids Online</p>
              <p style="margin: 0;">
                Questions? Contact us at <a href="mailto:support@NetDaddy.com" style="color: #4361ee; text-decoration: none;">support@NetDaddy.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
let lastEmailSentTime=0;
export function sendEmail(email,reason){
  const now = Date.now();
    
  // Check if a minute (60000 ms) has passed since the last email
  if (now - lastEmailSentTime < 60000) {
      console.log("Email sending rate limited. Try again later.");
      return false; // Email was not sent due to rate limiting
  }
  
  // Update the last sent time
  lastEmailSentTime = now;
  
  // Define email options
  let html = emailTemplate;
  const date = new Date();
  
  html = html.replace('{{reason}}', reason);
  html = html.replace('{{date}}', `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`);
  
  // Fix the time replacement logic
  html = html.replace('{{time}}', (() => {
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      
      if (hours >= 12) {
          return `${hours === 12 ? 12 : hours % 12}:${minutes}PM`;
      } else {
          return `${hours === 0 ? 12 : hours}:${minutes}AM`;
      }
  })());
  
  const mailOptions = {
      from: process.env.GMAIL_ID,
      to: email,
      subject: 'Notification from NetDaddy',
      text: `You are getting this email because ${reason}`,
      html: html
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

const unisntallHTML=`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NetDaddy Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="background-color:rgb(205, 2, 5); padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">NetDaddy Alert</h1>
              <p style="color: #ffffff; margin: 5px 0 0; font-size: 14px;">Keeping Your Child Safe Online</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; color: #333333;">
              <h2 style="font-size: 20px; margin: 0 0 15px;">Hello Parent,</h2>
              <p style="font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                We’re reaching out because NetDaddy has been <span style="font-weight: bolder;">uninstalled from your child's computer </span>. 
                For continued protection please re-install NetDaddy extension on your child's computer as soon as possible.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
export function onUninstall(email){
  const mailOptions = {
    from: process.env.GMAIL_ID,
    to: email,
    subject: 'Notification from NetDaddy',
    text: `We’re reaching out because NetDaddy has been uninstalled from your child's computer. 
                For continued protection please re-install NetDaddy extension on your child's computer as soon as possible.`,
    html: unisntallHTML
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