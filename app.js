// Declare dependencies
const express = require('express');
const http = require('http');
const path = require('path');
const nodemailer = require("nodemailer");

// Dependencies for using SSL cert
const https = require('https');
const fs = require('fs');

//Declare routes - Not using
// var index = require('./routes/index');
// var send = require('./routes/send');  // NOTE - I'M NOT USING THIS ROUTE. COULDN'T GET IT WORKING.

//Declare environment variable - Used only for testing using localhost
const env = require('env2')('process.env');
// console.log(process.env.NODEMAILER_USER);
// console.log(process.env.NODEMAILER_PASS);


// Declare application to be an express application
const app = express();



// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('../ssl/ip-172-26-11-115.key'),
  cert: fs.readFileSync('../ssl/WWW.ADVANCEDFLOOR.NET.crt'),
  ca: fs.readFileSync('../ssl/ca_bundle_certificate.crt'),
};


https.createServer(options, app).listen(443);

/*
var https_options = {

  key: fs.readFileSync("../private.key"),

  cert: fs.readFileSync("../WWW.ADVANCEDFLOOR.NET.crt"),

  ca: [

          fs.readFileSync('../CA_root.crt'),

          fs.readFileSync('../ca_bundle_certificate.crt')

       ]
};
*/


/* ****** View engine setup - Commenting out since I'm not using a view engine *****/
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  // Use this to add a browser icon for the app

/* SUPPOSED TO COMMENT THIS OUT BECAUSE STATIC FILES WILL BE SERVED FROM NGINX IN EB*/
app.use(express.static(path.join(__dirname, '/public')));  // Set static path, serves up the static index.html in the public folder

app.use("/public", express.static(__dirname + '/public'));  // Set static path, serves up the CSS, JS, etc.

// app.use('/', index); // NOTE - I'm not using this route because I'm serving a static HTML file from the public directory
// app.use('/send', send);  // NOTE - I'M NOT USING THIS ROUTE. COULDN'T GET IT WORKING.



/* COMMENTING THIS OUT BECAUSE THIS ERROR HANDLING DOESN't WORK
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

*/



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




