
const canvasBackground = new Image;
canvasBackground.src = './images/background.png';
const skill2 = new Image;
skill2.src = './images/skill2Anim.png';
const skill3 = new Image;
skill3.src = './images/skill3.png';

let thisFrame = 0;
let frameTime = 0;
let thisFrame2 = 0;
let thisFrame3 = 0;
let frameTime3 = 0;
let frameTime2 = 0;
let thisFrame4 =0;
let frameTime4 = 0;
let player;
let thisPlayer;
let playerImg = new Image;
let playerImg2 = new Image;
let skill1Used = false;
let increment = 0;

const skill1Hotkey = 81;
const skill2Hotkey = 49;


const socket = io('http://localhost:3000');

socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);
socket.on('unknownGame', handleUnknownGame);
socket.on('tooManyPlayers', handleTooManyPlayers);
socket.on('skill1', drawSkill1);
socket.on('skill2', drawSkill2);
socket.on('minusHp', minusHP);

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
    /*initialScreen.style.display = "block";
    gameScreen.style.display = "none";
    exitButton.style.display = "none";*/
    window.location.reload();
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

    if (e.keyCode === 65 || e.keyCode === 37) {
        skill2.src = './images/skill2Anim2.png';
    }
    if (e.keyCode === 68 || e.keyCode === 39) {
        skill2.src = './images/skill2Anim.png';
    }

    /*
     * When skill 1 is pressed, start counting to go on to next frames
     */
    if (e.keyCode === skill1Hotkey) {
        frameTime2 = 0;
        thisFrame2 = 0;
    }
    /*
     * When skill 2 is pressed, start counting to go on to next frames
     */
    if (e.keyCode === skill2Hotkey) {
        frameTime3 = 0;
        thisFrame3 = 0;
    }
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
     * Skills drawing
     */
    const skill1 = new Image;
    skill1.src = './images/skill1.png';
    drawSkill1(state.skill1, skill1);
    drawSkill2(state.skill2, skill2);
    drawSkill3(state.skill3, skill3);

    /*
     * Players drawing
     */
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
    ctx.drawImage(playerImage, 128 * thisFrame, 0, 128, 96, player.pos.x - 64, player.pos.y - 48, 128, 96);
}

function drawSkill1(position, image) {
    frameTime2 += 1.45;
    frameTime2 = frameTime2 % 51;
    thisFrame2 = Math.round(frameTime2 / 15);
    ctx.drawImage(image, 512 * thisFrame2, 0, 512, 512, position.x - 256, position.y - 256, 512, 512);
}

function drawSkill2(position, image) {
    frameTime3 += 2.15;
    frameTime3 = frameTime3 % 51;
    thisFrame3 = Math.round(frameTime3 / 15);
    ctx.drawImage(image, 512 * thisFrame3, 0, 512, 512, position.x - 256 + 10, position.y - 256 + 208, 512, 512);
}

function drawSkill3(position, image) {
    //ctx.drawImage(image, position.x - 128, position.y - 128, 256, 256);
    frameTime4 += 2.15;
    frameTime4 = frameTime4 % 51;
    thisFrame4 = Math.round(frameTime4 / 15);
    ctx.drawImage(image, 256 * thisFrame4, 0, 256, 256, position.x - 128, position.y - 128, 256, 256);

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

function minusHP(state, value) {
    const displayDamage = setInterval(() => {
        increment += 0.3;
        ctx.font = '600 36px abaddon';
        ctx.fillStyle = "#ff3838";
        ctx.fillText('-' + value, state.x - 30, state.y - 25 - increment);
    }, 1 / 3600);
    setTimeout(() => {
        clearInterval(displayDamage);
        increment = 0;
    }, 1000);
}

function reset() {
    playerNumber = null;
    gameCodeInput.value = '';
    gameCodeDisplay.innerText - "block";
    gameScreen.style.display = "none";
}
