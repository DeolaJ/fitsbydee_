const fetch = require('node-fetch');
const axios = require('axios'); 
const nodemailer = require("nodemailer")

module.exports = (app) => {

  app.post('/contact-form', (req, res) => {
    console.log(req.body)
    console.log('Request was made oooh')

    if(req.body.mail == "" || req.body.name == "") {
      res.send("Error: Full name or Email should not be Blank");
      return false;
    }

    var smtpTransport = nodemailer.createTransport("SMTP", {
      host: "smtp.gmail.com",
      secureConnection: true,
      port: 465,
      auth: {
        user: 'fitsbydee@gmail.com',
        pass: 'adecordam'
      }
    })

    var mailOptions = {
      from: "FitsyDee -<fitsbydee@gmail.com>",
      to: req.body.name,
      subject: "Contact Inquiry",
      text: req.body.message,
      html: "<br>"+req.body.message+"<br>"
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        res.send("Email could not send due to error: "+error)
      } else {
        res.send("Email has been sent successfully");
      }
    })

  })

}