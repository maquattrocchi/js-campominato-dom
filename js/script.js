/* Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste*/

//variabili
const play = document.getElementById('play');
console.log(play);
const resultDiv = document.getElementById('result');
console.log(resultDiv);
const bombNumber = 16;
let bombArray = [];
let maxAttempt = '';
let attempts = 0;
//funzione selezione livello
function setLevels(){
    let numberBox = document.getElementById('levels').value;
    console.log(numberBox);
    let boxPerSide = Math.sqrt(numberBox);
    maxAttempt = numberBox - bombNumber;
    generaBomb(numberBox)
    stampaGriglia(numberBox, boxPerSide);
}
//funzione numero random
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
//funzione genera bombe
function generaBomb(boxNumber){
    bombArray.length = 0
    while(bombArray.length < bombNumber){
        let bomb = getRandomInt(1, boxNumber)
        if (!bombArray.includes(bomb)){
            bombArray.push(bomb)
        }
    }
    console.log(bombArray)
}
//funzione per stampare la griglia
function stampaGriglia(boxNumber, boxPerSide){
    //selezione container e creazione main box
    let contenitore = document.getElementById('main_container');
    contenitore.innerHTML ='';
    let mainBox = document.createElement('div');
    mainBox.setAttribute('class', 'main_box');
    //creazione box
    for (let i = 1; i <= boxNumber; i++){
        const box = generaBox(i, boxPerSide);
        mainBox.append(box)
    }
    contenitore.append(mainBox)
}
//funzione per la creazione dei box
function generaBox(boxNumber, boxPerSide){
    //creazione box e assegnazione classi
    let box = document.createElement('div');
    box.setAttribute('class', 'box pointer');
    box.style.width = `calc(100% / ${boxPerSide}`;
    box.style.height = `calc(100% / ${boxPerSide}`;
    box.innerHTML = `<span> ${boxNumber} </span>`;
    //aggiunta evento
    box.addEventListener('click', istruzioniGioco);
    return box;
}
//funzione istruzioni gioco sui singoli box
function istruzioniGioco(){
    console.log(this)
    let num = parseInt(this.innerText);
    attempts++
    //corrispondenza tra bomb e box
    if(bombArray.includes(num)){
        showBox();
        this.style.background = 'red';
        this.innerHTML = `<span><i class="fa-solid fa-bomb"></i></span>`
        gameOver();
    } else {
        this.style.background = '#6495ED';
        if(attempts === maxAttempt){
            resultDiv.innerHTML += `<h1>Hai vinto!</h1>
            <h3>${attempts}</h3>`;
            showBox();
        }
    }
    console.log(attempts)
    this.classList.remove('pointer')
    this.removeEventListener('click', istruzioniGioco);
}
//funzione game over
function gameOver(){
    allBox = document.querySelectorAll('.box')
    console.log(allBox)
    for (i = 0; i < allBox.length; i++){
        allBox[i].classList.remove('pointer')
        allBox[i].removeEventListener('click', istruzioniGioco);
    }
    console.log(resultDiv)
    resultDiv.innerHTML = `
    <h1>Hai perso!</h1>
    <h3>Total attempts:${attempts}</h3>
    `
}
//funzione mostra box al termine del gioco
function showBox(){
    allBox = document.querySelectorAll('.box')
    console.log(bombArray)
    for (i = 0; i < allBox.length; i++){
        let num = parseInt(allBox[i].innerText)
        if(bombArray.includes(num)){
            allBox[i].style.background = 'red';
            allBox[i].innerHTML = `<span><i class="fa-solid fa-bomb"></i></span>`
        } else {
            allBox[i].style.background = '#6495ED';
        }
    }
}
//click su play
play.addEventListener('click', setLevels)
