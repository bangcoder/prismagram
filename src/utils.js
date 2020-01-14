import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import mg from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

// https://www.npmjs.com/package/nodemailer-mailgun-transport

// const sendMail = email => {
//   const options = {
//     auth: {
//       api_key: process.env.MAILGUN_API_KEY,
//       domain: process.env.MAILGUN_DOMAIN,
//     },
//   };
//   const client = nodemailer.createTransport(mg(options));
//   return client.sendMail(email);
// };

const sendMail = email => {
  const options = {
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "bangcoderpro@bangit.com",
    to: adress,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret it <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`,
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
