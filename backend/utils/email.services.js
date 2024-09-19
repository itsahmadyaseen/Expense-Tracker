import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";

configDotenv();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, subject, html) => {
  console.log("user email", email);
  console.log("my", process.env.EMAIL_USER);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: " + error);
    throw error;
  }
};

export const sendEmailForPasswordChange = async (email, token) => {
  console.log("email", process.env.EMAIL_USER);
  console.log("password", process.env.EMAIL_PASS);

  const subject = "Password reset";
  const html = `Use this token to <a href="http://localhost:3000/ResetPassword/${token}">reset your password</a>`;

  await sendEmail(email, subject, html);
};
