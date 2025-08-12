const nodemailer = require("nodemailer");

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.ETHREAL_USER,
    pass: process.env.ETHREAL_PASS,
  },
});

module.exports = transporter;