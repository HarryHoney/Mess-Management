var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'alumnicellnitj@gmail.com',
    pass: 'qebacpuswgsrlylp'
  },tls: true
});

const sendwecomeEmail = (email,name)=>{
    const data = `${name}, we welcome you to the NITJ Family`
    console.log('Sending mail')
    var mailOptions = {
      from: 'alumnicellnitj@gmail.com',
      to: email,
      subject: 'Welcome message',
      text: data
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

module.exports = {
  sendwecomeEmail:sendwecomeEmail
}