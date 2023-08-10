const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  //   secure: true, // use with https
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD,
  },
});

function sendMail({ name, subject, email, message }) {
  return transporter.sendMail({
    from: email,
    to: "mrinmaydey48@gmail.com",
    subject,
    text: `You have a message from ${name}: ${message}`,
  });
}

module.exports = sendMail;
