const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 4050;
const nodemailer = require("nodemailer"); //importing node mailer
const template = require("./template"); //importing node mailer

//IMPORTING ENVIRONMENT VARIABLES
dotenv.config();

//MIDDLEWARE

app.use(express.json(), cors());

//WE WILL BE USING POST API ENDPOINTS
app.post("/sending-mail", async (req, res) => {
  try {
    // CREATING TRANSPORTER OBJECT WITH SMTP TRANSPORT
    const transporter = nodemailer.createTransport({
      service: "gmail",
      // service: "smtp.ethereal.email", //ETHREAL SMTP
      // port: 587, //PORT
      auth: {
        user: process.env.EMAIL, //EMAIL IN .env
        pass: process.env.PASSWORD, //PASSWORD IN .env
      },
    });

    // ADDING MAIL OPTIONS
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: `HOLY DAMNNNNN !👻`,
      html: `${template}`,
    };
    // SENDING MAIL
    transporter.sendMail(mailOptions, (error, info) => {
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
