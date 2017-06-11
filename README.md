******* What I built: *********

I challenged myself to learn several new technologies so I could craft together a new responsive website for Advanced Floor Design (AFD). Years of Google Analytics data told me that more and more users were accessing advancedfloor.net using mobile devices, so I needed to ensure they had a positive experience.

First thing first, I found a fantastic free responsive template from HTML5 UP which had a great styling, slick JQuery functionality, and all necessary CSS & media query framework built in. I started with this template and then made several modifications and additions so it would work for AFD.

There is one dynamic component to the site - the Contact Us form. I could have easily re-implemented PHPMailer used on the previous version of the site, but I wanted to learn something new. I first tackled this functionality by build a Java EE web application that used the JavaMail API to send the emails (see project afd_site-jsp), but this proved to heavy weight so I re-architected and moved to a Node/Express framework and implemented NodeMailer.

I first deployed this application to a personally-configured EC2 instance running Ubuntu. I then moved the application to Elastic Beanstalk, deploying this express application using EB CLI.

A simple web app like this can be hosted in multiple services in AWS. I first deployed the application to a personally-configured EC2 instance running Ubuntu. I then moved the application to Elastic Beanstalk, which automatically provides additional services such as resource provisioning, load balancing, auto-scaling, and monitoring. 

Deploying an ExpressJS app to EB wasn't that simple though. It required that I install EB CLI, configure an EB CLI repository with my application folder (using 'eb init'), create an environment running a sample node application (using 'eb create'), and then add a config file (to /.ebextensions/nodecommand.config) that sets "npm start" as the default command to launch the node application, allowing my ExpressJS application to run.

In the end, I didn't need the performance, scalability, availability, etc. of EC2 or EB. I launched this app to AWS Lightsail, which is only $5/month for a virtual private server. I provisioned an Ubuntu server, installed all necessary packages (git, node/npm), clone my application via Github, configured a static IP address, updated iptables so I routed tcp port 80 to port 3000 where my application runs, launched my app using "npm start" in a persistent 'screen' environment in Ubuntu, and then updated DNS records at Network Solutions (domain provider) so www.advancedfloor.net points to this server (52.5.30.70).

Stuff I learned:
- AWS EB CLI & the necessary commands to initialize a repository, create an EB environment, and deploy an app to EB
- NodeMailer
- Using environment variables both locally in a process.env file (using env2 module to access them) and server-side (in EB configuration) to store sensitive information securely.
- How to deploy GitHub code to Elastic Beanstalk


AWS Lightsail: http://52.5.30.70/




******* Giving Credit Where Credit is Due *******

- Responsive Site Template: https://html5up.net/strata
- Navigation: https://www.w3schools.com/howto/howto_js_topnav.asp
- Sticky Navigation from Guil H: https://codepen.io/Guilh/pen/JLKbn
- Image Gallery: http://www.menucool.com/responsive-slider
- JQuery Validation: https://jqueryvalidation.org/
- JQuery Toggle Slide: https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_slide_toggle
- NodeMailer: https://github.com/nodemailer/nodemailer
- Deploying Express app to AWS EB: http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html
- env2 module for local environment variables: https://github.com/dwyl/learn-environment-variables
- Setup Node/Express App on EC2, and configure iptables so port 80 points to port 9000: https://www.youtube.com/watch?v=WxhFq64FQzA
