const nodemailer = require('nodemailer');
const fs = require('fs');


html = ``;
fs.readFile('games.json', (err, data) => {
  
  if (err) throw err;
  /*data.forEach(function (person) {
    html+= `<span>${person.winner}</span>`
  });  
  console.log(html);*/
  sendMail(data);  
});

function sendMail(data) {
  console.log(data);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yoanbelo@gmail.com',
      pass: 'yoanbello'
    }
  });

  let mailOptions = {
    from: 'yoanbelo@gmail.com',
    to: 'ybello@digitalprojex.com',
    subject: 'Results Games NBA',    
    text: data
    
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}
