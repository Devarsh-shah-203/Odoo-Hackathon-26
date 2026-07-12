import transporter from "../config/mailer.js";
import nodemailer from "nodemailer";
import ApiError from "../utils/ApiError.js";

import WelcomeEmployeeTemplate from "../templates/WelcomeEmail.template.js";


export const sendEmail = async ({
    to,
    subject,
    html,
}) => {
    if (!to) {
        throw new ApiError(400, "Recipient email is required.");
    }

    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        html,
    });
};

export const sendWelcomeEmployeeEmail = async ({
    name,
    role,
    email,
    temporaryPassword,
}) => {

    const html = WelcomeEmployeeTemplate({
        name,
        role,
        email,
        temporaryPassword,
    });

    await sendEmail({
        to: email,
        subject: "Welcome to TransitOps 🚛",
        html,
    });
};

 export const SendVerificationCode = async (UserMail) => {
  const code = String(Math.floor(100000 + Math.random() * 900000));

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER, // sender address
      to: UserMail, // list of recipients
      subject: "Forgot Password", // subject line
      text: `Your verifiaction code : ${code}`, // plain text body
      html: `<b> Your verifiaction code : ${code}</b>`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }

  return code;
};