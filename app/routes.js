'use strict';
const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports = function (app) {


    // Note that res.sendFile() is not implemented with the sendfile system call, which 
    // would make it far more efficient. Instead, use serve-static middleware (or something 
    // equivalent), that is optimized for serving files for Express apps. An even better option 
    // is to use a reverse proxy to serve static files; see Use a reverse proxy for more information

	  app.get('/', function(req,res) {
      res.sendFile(require('path').join(__dirname, '../views/index.html'));
    });


    // app.get('/work', function(req,res) {
    //   res.sendFile(require('path').join(__dirname, 'views/work.html'));
    // });

    // app.get('/about', function(req,res) {
    //   res.sendFile(require('path').join(__dirname, 'views/about.html'));
    // });

    

    app.get('/robots.txt', function(req,res) {
      res.sendFile(require('path').join(__dirname, '../robots.txt'));
    });

    app.post('/api/sendemail', function(req,res) {
		  
  		let transporter = nodemailer.createTransport({
  		    host: 'smtp.gmail.com',
  		    port: 465,
  		    secure: true, // secure:true for port 465, secure:false for port 587
  		    auth: {
  		        user: 'teamplatoworks@gmail.com',
  		        pass: 'myway$1A'
  		    },
          tls: {
              // do not fail on invalid certs
              rejectUnauthorized: false
          }
  		});
     
  		let mailOptions = {
  		    from: `"${req.body.name} 👻" <${req.body.email}>`, // sender address
  		    to: 'raopreetam007@gmail.com', // list of receivers
  		    subject: `PLATOWORKS INQUIRY FROM ${req.body.email}`, // Subject line
          html : `<b>${req.body.email}</b><br>${req.body.message}`
  		};

  		// send mail with defined transport object
  		transporter.sendMail(mailOptions, (error, info) => {
  		    if (error) {
  		        return res.status(404).send("Oh uh, something went wrong");
  		    }
  		    console.log('Message %s sent: %s', info.messageId, info.response);
          res.json("success");
  		});
    });

    app.get('*',function(req,res) {
      res.redirect('/');
    });
};