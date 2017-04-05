

// Declare dependencies
var express = require('express');
var nodemailer = require("nodemailer");
var http = require('http');

const env = require('env2')('config.env');

/*
console.log(process.env.USER);
console.log(process.env.NODEMAILER_PASS);
*/

// Defining SMTP mail server details to use my gmail to send the email

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


// Version 2 from http://stackoverflow.com/questions/24973965/sending-emails-using-nodemailer
/*
var smtpTransport = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: { user: 'abc@gmail.com',
        pass: 'pass' }
  }));
  */


// Declare application to be an express application
var app = express();

// Ensure index.html is served when users hit the domain
app.get('/',function(req, res){ //get,put,post,delete   
      res.sendFile(__dirname + '/views/index.html');
    });

// Handles route request for /send, which is triggered by the email form
app.get('/send',function(req,res){
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


// Have server listen at a certain port
app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});



//WHAT DOES THIS DO?
var routes = require('./routes/index');




/*------------------Serve Static Files Started-----------------------------*/

app.use("/public", express.static(__dirname + '/public'));

// view engine setup if using ejs or Jade
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


/*------------------Serve Static Files Over-----------------------------*/







