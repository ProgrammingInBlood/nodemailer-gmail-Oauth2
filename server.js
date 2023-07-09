//create express server
const express = require("express");
const app = express();
const port = 3010;
const { sendTestEmail } = require("./mailer");

app.get("/", (req, res) => {
  res.send("Run /send-email to send test email");
});

/*POPULATE SENDER_EMAIL_ID*/
const SENDER_EMAIL_ID = "EMAIL_ID";

app.get("/send-email", async (_, res) => {
  try {
    if (SENDER_EMAIL_ID === "EMAIL_ID") {
      throw new Error(
        "Please update SENDER_EMAIL_ID with your email id in server.js"
      );
    }
    const info = await sendTestEmail(SENDER_EMAIL_ID);
    res.send(info);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
