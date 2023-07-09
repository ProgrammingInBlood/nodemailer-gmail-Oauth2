const { google } = require("googleapis");
const nodemailer = require("nodemailer");

/*POPULATE BELOW FIELDS WITH YOUR CREDETIALS*/

const CLIENT_ID = "ENTER_YOUR_CLIENT_ID";
const CLIENT_SECRET = "ENTER_YOUR_CLIENT_SECRET";
const REFRESH_TOKEN = "ENTER_YOUR_REFRESH_TOKEN";
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; //DONT EDIT THIS
const MY_EMAIL = "ENTER_YOUR_EMAIL_ID";

/*POPULATE ABOVE FIELDS WITH YOUR CREDETIALS*/

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//YOU CAN PASS MORE ARGUMENTS TO THIS FUNCTION LIKE CC, TEMPLATES, ATTACHMENTS ETC. IM JUST KEEPING IT SIMPLE
const sendTestEmail = async (to) => {
  const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MY_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  //EMAIL OPTIONS
  const from = MY_EMAIL;
  const subject = "🌻 This Is Sent By NodeMailer 🌻";
  const html = `
    <p>Hey ${to},</p>
    <p>🌻 This Is A Test Mail Sent By NodeMailer 🌻</p>
    <p>Thank you</p>
    `;
  return new Promise((resolve, reject) => {
    transport.sendMail({ from, subject, to, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

module.exports = { sendTestEmail };
