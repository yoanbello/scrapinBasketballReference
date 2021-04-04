fetch('games.json')
.then(function (response) {
    return response.json();
})
.then(function (data) {
    appendData(data);
})
.catch(function (err) {
    console.log('error: ' + err);
});

function appendData(data) {
let mainContainer = document.getElementById("myData");
let title = document.querySelector("h1");
title.innerText = data.date

for (let i = 0; i < data.data.length; i++) {
    let divWinner = document.createElement("div");
    let nameWinner = document.createElement("span")
    let scoreWinner = document.createElement("span")

    let divLoser= document.createElement("div");
    let nameLoser = document.createElement("span")
    let scoreLoser = document.createElement("span")
    let br = document.createElement("br")
    //winner
    nameWinner.innerText = data.data[i].winner + ' ' + ':' + ' ' 
    nameWinner.className = 'team-winner'
    scoreWinner.innerText = data.data[i].pointWinner
    scoreWinner.className = 'score-winner'

    divWinner.appendChild(nameWinner)
    divWinner.appendChild(scoreWinner)    
    mainContainer.appendChild(divWinner);
    mainContainer.appendChild(br)

    //loser
    nameLoser.innerText = data.data[i].loser + ' ' + ':' + ' '
    scoreLoser.innerText = data.data[i].pointLoser
    divLoser.appendChild(nameLoser)
    divLoser.appendChild(scoreLoser)
    mainContainer.appendChild(divLoser); 
    mainContainer.appendChild(br) 
 
}
}