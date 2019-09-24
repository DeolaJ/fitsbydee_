const fetch = require('node-fetch');
const axios = require('axios'); 
const nodemailer = require("nodemailer")

module.exports = (app) => {

  app.post('/contact-form', (req, res) => {
    console.log(req.body)
    console.log('Request was made oooh')

    if(req.body.email == "" || req.body.name == "") {
      res.send("Error: Full name or Email should not be Blank");
      return false;
    }

    var smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      secureConnection: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: 'fitsbydee@gmail.com',
        pass: 'adecordam'
      }
    })

    var mailOptions = {
      from: req.body.name + " -<" + req.body.email + ">",
      replyTo: req.body.email,
      to: "fitsbydee@gmail.com",
      subject: "Contact Inquiry",
      text: "Name: "+req.body.name+". Email: "+req.body.email+". Message: "+req.body.message,
      html: "<strong>"+req.body.name+", "+req.body.email+"</strong>"+"<br><br>"+req.body.message+"<br>"
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        res.send("Email could not send due to error: "+error)
      } else {
        res.send("Email has been sent successfully");
      }
    })

  })

  app.post('/order-form', (req, res) => {
    console.log(req.body)
    console.log('Request was made oooh')

    if(req.body.email == "") {
      res.send("Error: Email should not be Blank");
      return false;
    }

    var smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      secureConnection: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: 'fitsbydee@gmail.com',
        pass: 'adecordam'
      }
    })

    var mailOptions = {
      from: req.body.name + " -<" + req.body.email + ">",
      replyTo: req.body.email,
      to: "fitsbydee@gmail.com",
      subject: req.body.name+" made an Order",
      text: "Name: "+req.body.name+". Email: "+req.body.email+". Message: "+req.body.message,
      html: "<strong>"+req.body.name+", "+req.body.email+"</strong>"+"<br><br>"+req.body.message+"<br>"
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