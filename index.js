const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 4050;
const nodemailer = require("nodemailer"); //importing node mailer

dotenv.config();

//MIDDLEWARE

app.use(express.json(), cors());

app.post("/sending-mail", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: `Regarding you Registration with VMS`,
      html: `<h2 style="color: red">Hi hehe</h2>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(401).send("error");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Sent Successfully");
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => console.log(`server up and running at  ${PORT}`));
