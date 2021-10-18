const playerImg = new Image;
playerImg.src = './images/player.png';
const playerImg2 = new Image;
playerImg2.src = './images/player2.png';
const canvasBackground = new Image;
canvasBackground.src = './images/testCanvasBackground.png';

let thisFrame=0;
let frameTime=0;

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


let ctx;
let canvas;
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

/*ctx.fillStyle = 'grey';
ctx.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height);*/

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);
gameActive = true;
}

function keydown(e){
    socket.emit('keydown', e.keyCode);


}

function keyup(e){
    socket.emit('keyup', e.keyCode);
}

function paintGame(state) {
    ctx.fillStyle = 'red';
    ctx.fillRect(20,150, 650,650);

    ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    //
    //* Showing up players radius to see if hitboxes are fine
    //
   /* ctx.beginPath();
    ctx.arc(state.players[0].pos.x + 30, state.players[0].pos.y + 30, state.players[0].radius, 0 ,2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(state.players[1].pos.x + 30, state.players[1].pos.y + 30, state.players[1].radius, 0 ,2*Math.PI);
    ctx.stroke();*/
    drawPlayer(state.players[0], playerImg);
    drawPlayer(state.players[1],playerImg2);
    //ctx.rotate(45 * Math.PI/180); Funny effect
}

function drawPlayer(playerState, playerImage){
    let player = playerState;

    frameTime += 0.15;
    frameTime = frameTime % 15;
    thisFrame = Math.round(frameTime / 15);
    ctx.drawImage(playerImage, 128 *thisFrame, 0, 128, 96, player.pos.x, player.pos.y, 128, 96);
    

    /*ctx.fillStyle = 'red';
    ctx.fillRect(player.pos.x,player.pos.y, 70, 70);*/
    //console.log(player);
}

function handleInit(number) {
    playerNumber = number;
}

function showHitboxes(){

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
