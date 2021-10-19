
const canvasBackground = new Image;
canvasBackground.src = './images/cityBackground.png';

let thisFrame = 0;
let frameTime = 0;
let player;
let thisPlayer;
let playerImg = new Image;
let playerImg2 = new Image;
let skill1Used = false;

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
const exitButton = document.getElementById('exitButton');

newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);
exitButton.addEventListener('click', exit);


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

function exit() {
    initialScreen.style.display = "block";
    gameScreen.style.display = "none";
    exitButton.style.display = "none";
}

function init() {
    exitButton.style.display = "block";
    initialScreen.style.display = "none";
    gameScreen.style.display = "block";

    canvas = document.getElementById('mainSection');
    ctx = canvas.getContext('2d');

    canvas.width = 1420;
    canvas.height = 760;

    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);
    gameActive = true;
}

function keydown(e) {
    socket.emit('keydown', e.keyCode);
    /**
     * Players flip their image if they are moving towards direction
     */
    /*if (e.keyCode === 37 || e.keyCode === 65){
        if(playerNumber == 1){
            playerImg.src = './images/player.png';
        }else if(playerNumber == 2){
            playerImg2.src = './images/player2.png';
        }
    } else if (e.keyCode === 39 || e.keyCode === 68){
        if(playerNumber == 1){
            playerImg.src = './images/playerF.png';
        } else if(playerNumber == 2){
            playerImg2.src = './images/player2F.png';
        }
    }*/
    /**
     * Attack when spacebar is pressed
     */

}

function keyup(e) {
    socket.emit('keyup', e.keyCode);
}

function paintGame(state) {
    ctx.fillStyle = 'grey';
    ctx.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height);

    //
    //* Showing up players radius to see if hitboxes are fine
    //
    /* ctx.beginPath();
     ctx.arc(state.players[0].pos.x + 30, state.players[0].pos.y + 30, state.players[0].radius, 0 ,2*Math.PI);
     ctx.stroke();
     ctx.beginPath();
     ctx.arc(state.players[1].pos.x + 30, state.players[1].pos.y + 30, state.players[1].radius, 0 ,2*Math.PI);
     ctx.stroke();*/
    playerImg.src = state.players[0].img;
    playerImg2.src = state.players[1].img;
    /**
     * SKill1 drawing
     */
    const skill1 = new Image;
     skill1.src = './images/skill1.png';
    ctx.drawImage(skill1, state.skill1.x, state.skill1.y, 256, 256);

    drawPlayer(state.players[0], playerImg);
    drawPlayer(state.players[1], playerImg2);
    //ctx.rotate(45 * Math.PI/180); Funny effect
    showCharacterStatus(state);
}

function drawPlayer(playerState, playerImage) {
    player = playerState;

    frameTime += 0.15;
    frameTime = frameTime % 15;
    thisFrame = Math.round(frameTime / 15);
    ctx.drawImage(playerImage, 128 * thisFrame, 0, 128, 96, player.pos.x, player.pos.y, 128, 96);
}

function showCharacterStatus(state) {
    ctx.font = '600 36px abaddon';
    ctx.fillStyle = "#ff3f34";
    ctx.fillText('Health: ' + Math.floor(state.players[playerNumber - 1].hp), 1210, 30);
    ctx.fillStyle = "#0fbcf9";
    ctx.fillText('Mana: ' + Math.floor(state.players[playerNumber - 1].mana), 1210, 65);

    thisPlayer = state.players[playerNumber - 1];
}

function handleInit(number) {
    playerNumber = number;
}

function showHitboxes() {

}

function handleGameState(gameState) {
    if (!gameActive) {
        return;
    }
    gameState = JSON.parse(gameState);
    requestAnimationFrame(() => paintGame(gameState))
}

function handleGameOver(data) {
    if (!gameActive) {
        return;
    }
    data = JSON.parse(data);

    gameActive = false;

    if (data.winner === playerNumber) {
        alert("You win!");
    } else {
        alert("You lose!");
    }
    window.location.reload(true);
}

function handleGameCode(gameCode) {
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
