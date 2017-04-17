******* What I built: *********

I challenged myself to learn several new technologies so I could craft together a new responsive website for Advanced Floor Design (AFD). Years of Google Analytics data told me that more and more users were accessing advancedfloor.net using mobile devices, so I needed to ensure they had a positive experience.

First thing first, I found a fantastic free responsive template from HTML5 UP which had a great look and feel, slick JQuery functionality, and all necessary CSS & media query framework built in. I started with this template and then made several modifications/additions so it would work for AFD.

There is one dynamic component to the site - the Contact Us form. I could have easily re-implemented PHPMailer used on the previous version of the site, but I wanted to learn something new. I first tackled this functionality by build a Java EE web application that used the JavaMail API to send the emails (see project afd_site-jsp), but this proved to heavy weight so I re-architected and moved to a Node/Express framework.

[FILL IN MORE DETAILS HERE]

Stuff I learned:
- AWS EB CLI & the necessary commands to initialize a repository, create an EB environment, and deploy an app to EB
- NodeMailer
- Using environment variables (both locally in a process.env file and server-side in configuration) to store sensitive information securely.
- How to deploy an Express app to Elastic Beanstalk (it's not as straight forward as I thought it would be)


AWS: http://node-express-env.grfksc5d6y.us-west-2.elasticbeanstalk.com/




******* Giving Credit Where Credit is Due *******

Responsive Site Template: https://html5up.net/strata
Navigation: https://www.w3schools.com/howto/howto_js_topnav.asp
Sticky Navigation from Guil H: https://codepen.io/Guilh/pen/JLKbn
Image Gallery: http://www.menucool.com/responsive-slider
JQuery Validation: https://jqueryvalidation.org/
JQuery Toggle Slide: https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_slide_toggle
NodeMailer: https://github.com/nodemailer/nodemailer
Deploying Express app to AWS EB: http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html
env2 module for local environment variables: https://github.com/dwyl/learn-environment-variables
