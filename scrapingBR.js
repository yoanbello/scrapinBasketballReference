const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const nodemailer = require('nodemailer');
const fs = require('fs');


let date = ''

const url = 'https://www.basketball-reference.com/boxscores/?month=3&day=29&year=2021'
const url2 = 'https://www.basketball-reference.com/boxscores/'

 nightmare
  .goto(url2)
  .wait('.game_summary.expanded.nohover')
  .evaluate(() =>{
    date = document.querySelector('h1').innerText;
    let ads = [...document.querySelectorAll('.game_summary.expanded.nohover')];
  /*  let forSaleAds = ads.filter(ad=> ad.querySelector('.game_summary.expanded.nohover'));*/
    
    let data = ads.map(ad => {
      let winner = ad.querySelector('.winner a').innerText;
      let pointWinner = ad.querySelector('.winner .right').innerText;
      let loser = ad.querySelector('.loser a').innerText;
      let pointLoser  = ad.querySelector('.loser .right').innerText;
			
      return {winner,pointWinner, loser, pointLoser} ;
    });


    return {data,date}
   
  }).end().then(data => {
    console.log(data.date)
    //convert to JSON and save as file    
    html = `<h2>${data.date}</h2>`
     data.data.forEach(user=>{
      const{winner,pointWinner,loser,pointLoser} = user
      html+= `<div><span style="font: 14px/1.25; font-family: Helvetica Neue;color: #000;font-weight: bold;">${winner}: </span><span style="font: 14px/1.25; font-family: Helvetica Neue;color: #000;font-weight: bold;">${pointWinner}</span></div><div><span>${loser}: </span><span>${pointLoser}</span></div><br>` 
    })
    data = JSON.stringify(data, null, 2);  
    sendMail(html)
    
    fs.writeFileSync('games.json', data);

   
  })
 /*   const fect = data
    fect.then(new =>{
      new.data.forEach(user=>{
        const{winner,pointWinner,loser,pointLoser} = user
        html+= `<div><span>${winner}</span><span>${pointWinner}</span></div><div><span>${loser}</span><span>${pointLoser}</span></div>` 
      })
    })  */
   
    
 // console.log(html);
    
    //


  
  .catch(error => {
    console.error('Scraping failed:', error)
  })  
 
 
  function sendMail(htmlMail) {  
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
    html: htmlMail
    
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}


  