const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const publicPath = path.join(__dirname, "..", "public");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded(({extended: true})));

app.use(express.static(publicPath));


app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});



app.post("/", function(req, res) {
    
    let data = req.body;

    const smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
                 user: process.env.EMAIL_ID,
                 pass: process.env.ALTERNATIVE_PASSWORD
        }
      }
      const transporter = nodemailer.createTransport(smtpConfig);
      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: process.env.EMAIL_ID,
        subject: 'movies', 
        html: 'Email Content' 
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)                          
        } 
        else {
          console.log(`Message sent: ${info.response}`);
        };
      });
    

    transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

});

app.listen(port, () => {
    console.log("Server is running on port 3000");
});