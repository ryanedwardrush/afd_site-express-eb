// Declare dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require("nodemailer");


//Declare routes - Not using
// var index = require('./routes/index');
// var send = require('./routes/send');  // NOTE - I'M NOT USING THIS ROUTE. COULDN'T GET IT WORKING.

//Declare environment variable - Used only for testing using localhost
const env = require('env2')('process.env');

// Declare application to be an express application
var app = express();

app.use(express.static(path.join(__dirname, '/public')));  // Set static path, serves up the static index.html in the public folder
app.use("/public", express.static(__dirname + '/public'));  // Set static path, serves up the CSS, JS, etc.




// Defining SMTP mail server details to use Network Solutions mail to send the email
var smtpTransport = nodemailer.createTransport({
    host: "smtp.advancedfloor.net",
    port: "587",
    ignoreTLS: true,
    /* tls: {
        rejectUnauthorized:false
    }, */
    auth: {
        user: process.env.NODEMAILER_USER, //TASK: NEED TO CHANGE THIS BEFORE OFFICIALLY DEPLOYING THIS NEW SITE
        pass: process.env.NODEMAILER_PASS
    }
});

// Handles route request for /send, which is triggered by the email form
app.get('/send', function(req, res){

  var mailOptions={
    from: req.query.email + " (" + req.query.name + ")",
    to: req.query.to,
    subject: "Inquiry from new website",
    html: "<strong>Name:</strong> " + req.query.name + "<br />" + "<strong>Email:</strong> " + req.query.email + "<br />" + "<strong>Phone:</strong> " + req.query.phone + "<br /> <p>" + "<strong>Message:</strong> " + "<br />" + req.query.message + "</p>"
  }

  console.log(mailOptions);

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });

});


// Have server listen at a certain port ** NOT NECESSARY IN EXPRESS. IT"S HANDLED IN THE WWW FILE IN BIN **
/* app.listen(3000,function(){
    console.log("Express Started on Port 3000");
}); */


module.exports = app;

