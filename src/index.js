let ctx, canvas;

const socket = io('http://localhost:3000');
socket.on('init', handleInit);

function init() {
canvas = document.getElementById('mainSection');
ctx = canvas.getContext('2d');

document.addEventListener('keydown', keydown);
}

function keydown(e){
    if(e.keyCode == 87 || e.keyCode == 38){
        console.log('move up');
    } else if (e.keyCode == 40 || e.keyCode == 83){
        console.log('move down');
    } else if (e.keyCode == 37 || e.keyCode ==  65){
        console.log('move left');
    } else if (e.keyCode == 39 || e.keyCode == 68){
        console.log('move right');
    }
}


function drawPlayer(){
    //ctx.drawImage(playerImg, game.player.pos.x, game.player.pos.y, 60, 60);
    ctx.fillStyle = 'red';
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

init();
drawPlayer();
console.log(canvas.height);

/*setInterval(() => {
    drawPlayer();
}, 1000/60);*/

function handleInit(msg) {
    console.log(msg);
}
