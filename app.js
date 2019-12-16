// Declare dependencies
const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const nodemailer = require("nodemailer");
const env = require('env2')('process.env'); //Declare environment variable - Used only for testing using localhost
// console.log(process.env.NODEMAILER_USER);
// console.log(process.env.NODEMAILER_PASS);

// const hostname = '0.0.0.0'; // Is this really needed?
const httpPort = 3000;
const httpsPort = 8443;


// HTTPS Options
const key = fs.readFileSync('../ssl/ip-172-26-11-115.key');
const ca = fs.readFileSync('../ssl/ca_bundle_certificate.crt');
const cert = fs.readFileSync('../ssl/WWW.ADVANCEDFLOOR.NET.crt');

const httpsOptions = {
  key: key,
  cert: cert,
  ca: ca,
};

// Initialize expresss
const app = express();


//Decalre both http and https servers
//const httpServer = http.createServer(app);
const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);


// redirect HTTP server
app.all('*', ensureSecure); // at top of routing calls

// Serve the public folder path
app.use(express.static(path.join(__dirname, '/public')));  // Set static path, serves up the static index.html in the public folder
app.use("/public", express.static(__dirname + '/public'));  // Set static path, serves up the CSS, JS, etc.



/* ========== START OF MAIL APP ============ */

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

/* ========== END OF MAIL APP ============ */


httpServer.listen(httpPort, () => console.log(`HTTP server listening on port 3000`));
httpsServer.listen(httpsPort, () => console.log(`HTTPS server listening on port 8443`));



function ensureSecure(req, res, next){
  if(req.secure){
    // OK, continue
	console.log('Secure request');
    return next();
  };
  // handle port numbers if you need non defaults
  // res.redirect('https://' + req.host + req.url); // express 3.x
  console.log('Insecure request redirected');
  res.redirect('https://' + req.hostname + req.url); // express 4.x
}



// The calls below provide hostname as an argument, not sure why
// httpServer.listen(httpPort, hostname, () => console.log(`HTTP server listening on port 8080`));
// httpsServer.listen(httpsPort, hostname, () => console.log(`HTTPS server listening on port 8443`));


// Have server listen at a certain port ** NOT NECESSARY IN EXPRESS. IT"S HANDLED IN THE WWW FILE IN BIN **
/* app.listen(3000,function(){
    console.log("Express Started on Port 3000");
}); */



// module.exports = app;




