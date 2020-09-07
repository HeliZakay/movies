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
    let smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "helizakay2@gmail.com",
            pass: process.env.ALTERNATIVE_PASSWORD
        }
    });
    smtpTransport.sendMail({
        from: "helizakay2@gmail.com",
        to:"helizakay2@gmail.com",
        subject: "Movies Recommendations",
        html: data
    }, function(error, response) {
        if(error){
            console.log(error);
        } else {
            console.log(response.message);
        }
    smtpTransport.close();
    
    });
});

app.listen(port, () => {
    console.log("Server is running on port 3000");
});