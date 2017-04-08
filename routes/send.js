//NOTE - I'M NOT USING THIS ROUTE. COULDN'T GET IT WORKING.

var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");


//Declare environment variable
const env = require('env2')('config.env');
// console.log(process.env.USER);
// console.log(process.env.NODEMAILER_PASS);


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
router.get('/send', function(req, res){

	var mailOptions={
		from: req.query.email + req.query.name,
		to: req.query.to,
		subject: "Inquiry from website",
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

module.exports = router;


// Version 2 from http://stackoverflow.com/questions/24973965/sending-emails-using-nodemailer
/*
var smtpTransport = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: { user: 'abc@gmail.com',
        pass: 'pass' }
  }));
*/


