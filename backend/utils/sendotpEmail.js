// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtpout.secureserver.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.MAIL_USER, // admin@easypans.com
//     pass: process.env.MAIL_PASS, // mailbox password
//   },
// });

// const sendOtpEmail = async (email, otp) => {
//   if (!email) {
//     throw new Error("Recipient email missing");
//   }

//   await transporter.sendMail({
//     from: '"EasyPans" <no-reply@easypans.com>',
//     to: email,
//     subject: "Your Easypans Registration OTP",
//     html: `
//       <h2>Your OTP for Easypans Registration is: ${otp}</h2>
//       <p>This OTP is valid for the next 10 minutes and can be used only once. Please do not share it with anyone.
// </p>
//       <br/>
//       <p>Warm regards,<br/>Team Easypans</p>
//     `,
//   });
// };

// module.exports = sendOtpEmail;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Your Easypans Registration OTP",
    html: `
      <h2>Your OTP is: ${otp}</h2>
      <p>This OTP is valid for 10 minutes.</p>
    `,
  });
};

module.exports = sendOtpEmail;
