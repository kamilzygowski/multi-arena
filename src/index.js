
const playerImg = new Image;
playerImg.src = './images/player.png';
const playerImg2 = new Image;
playerImg2.src = './images/player2.png';

const socket = io('http://localhost:3000');

socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);
socket.on('unknownGame', handleUnknownGame);
socket.on('tooManyPlayers', handleTooManyPlayers);

const gameScreen = document.getElementById('mainSection');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');

newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);


let ctx, canvas;
let playerNumber;
let gameActive = false;

function newGame() {
    socket.emit('newGame');
    init();
}

function joinGame() {
    const code = gameCodeInput.value;
    socket.emit('joinGame', code);
    init();
}

function init() {
initialScreen.style.display = "none";
gameScreen.style.display = "block";

canvas = document.getElementById('mainSection');
ctx = canvas.getContext('2d');

canvas.width = 1420;
canvas.height = 760;

ctx.fillStyle = 'grey';
ctx.fillRect(0, 0, canvas.width, canvas.height);

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);
gameActive = true;


}

function keydown(e){
    socket.emit('keydown', e.keyCode);
    console.log(e);
}

function keyup(e){
    socket.emit('keyup', e.keyCode);
}

function paintGame(state) {
    ctx.fillStyle = 'red';
    ctx.fillRect(20,150, 650,650);

    ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPlayer(state.players[0], playerImg);
    drawPlayer(state.players[1],playerImg2);
}

function drawPlayer(playerState, playerImage){
    let player = playerState;
    ctx.drawImage(playerImage, player.pos.x,player.pos.y, 60, 60);
    /*ctx.fillStyle = 'red';
    ctx.fillRect(player.pos.x,player.pos.y, 70, 70);*/
    //console.log(player);
}

function handleInit(number) {
    playerNumber = number;
}

function handleGameState(gameState) {
    if (!gameActive){
        return;
    }
    gameState = JSON.parse(gameState);
    requestAnimationFrame(() => paintGame(gameState))
}

function handleGameOver(data) {
    if (!gameActive){
        return;
    }
    data = JSON.parse(data);

    gameActive = false;

    if(data.winner === playerNumber){
        alert("You win!");
    } else {
    alert("You lose!");
    }
}

function handleGameCode(gameCode){
    gameCodeDisplay.innerText = gameCode;
}

function handleUnknownGame() {
    reset();
    alert("Unknown game code");
}

function handleTooManyPlayers() {
    reset();
    alert("This game is already in progress!");
}

function reset() {
    playerNumber = null;
    gameCodeInput.value = '';
    gameCodeDisplay.innerText - "block";
    gameScreen.style.display = "none";
}
