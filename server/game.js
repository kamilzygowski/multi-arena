const {gameHeight, gameWidth, playerSpeed} = require('./constants');

let canIMove = true;

module.exports = {
    gameLoop,
    getUpdatedVelocity,
    initGame,
}

function initGame() {
    const state = createGameState();
    return state;
}


function collision(object1, object2, colliderObject) {
    var dx = object1.pos.x - object2.pos.x;
    var dy = object1.pos.y - object2.pos.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < object1.radius + object2.radius) {
        if (colliderObject === 'playersCollision'){
            console.log(object1);
            
        }
    }
}

function createGameState() {
    
return {
    players: [{
        pos: {
            x: 620,
            y: 460
        },
        vel: {
            x:0,
            y:0
        },
        radius: 30,
    }, {
        pos: {
            x: 1110,
            y: 460
        },
        vel: {
            x:0,
            y:0
        },
        radius: 30,
    }
    ],
    healingPotion: {},
};
}

function gameLoop(state) {
    if (!state){
        console.log('returned');
        return;
    }
    
    const playerOne = state.players[0];
    const playerTwo = state.players[1];

    collision(playerOne, playerTwo, 'playersCollision');

    /**
     * 
     This block is controling where is the edge of the screen and makes player not corssing those edges
     *
     **/
    if (canIMove){
    if (playerOne.pos.x < gameWidth && playerOne.pos.x >0)
    {
    playerOne.pos.x += playerOne.vel.x;
    } else if (playerOne.pos.x >= gameWidth && playerOne.vel.x <0){
        playerOne.pos.x += playerOne.vel.x;
    } else if (playerOne.pos.x <= 0 &&  playerOne.vel.x >0){
        playerOne.pos.x += playerOne.vel.x;
    }
    if (playerOne.pos.y < gameHeight && playerOne.pos.y >0)
    {
    playerOne.pos.y += playerOne.vel.y;
    } else if (playerOne.pos.y >= gameHeight && playerOne.vel.y <0){
        playerOne.pos.y += playerOne.vel.y;
    } else if (playerOne.pos.y <= 0 &&  playerOne.vel.y >0){
        playerOne.pos.y += playerOne.vel.y;
    }

    if (playerTwo.pos.x < gameWidth && playerTwo.pos.x >0)
    {
    playerTwo.pos.x += playerTwo.vel.x;
    } else if (playerTwo.pos.x >= gameWidth && playerTwo.vel.x <0){
        playerTwo.pos.x += playerTwo.vel.x;
    } else if (playerTwo.pos.x <= 0 &&  playerTwo.vel.x >0){
        playerTwo.pos.x += playerTwo.vel.x;
    }
    if (playerTwo.pos.y < gameHeight && playerTwo.pos.y >0)
    {
    playerTwo.pos.y += playerTwo.vel.y;
    } else if (playerTwo.pos.y >= gameHeight && playerTwo.vel.y <0){
        playerTwo.pos.y += playerTwo.vel.y;
    } else if (playerTwo.pos.y <= 0 &&  playerTwo.vel.y >0){
        playerTwo.pos.y += playerTwo.vel.y;
    }
}
    /*
    * The end of player not going out!
    */ 

    /*if(playerTwo.pos.x < 0 || playerTwo.pos.y < 0){
        return 2;
    }

    if(playerTwo.pos.x < 0 || playerTwo.pos.y < 0){
        return 1;
    }*/

    return false;
}

function healingPotions(state) {
    healingPotion = {
        x: Math.floor(Math.random() * 50),
        y: Math.floor(Math.random() * 50),
    }

    state.healingPotion = healingPotion;
}

function getUpdatedVelocity(keyCode, state){
    
    switch (keyCode) {
        case 37: {// left
            return {x: -playerSpeed, y:state.y};
        }
        case 38: {// down
            return {x:state.x, y:-playerSpeed};
        }
        case 39: {// right
            return {x: playerSpeed, y:state.y};
        }
        case 40: {// up
            return {x:state.x, y:playerSpeed};
        }
        case 65: {// left
            return {x: -playerSpeed, y:state.y};
        }
        case 87: {// down
            return {x:state.x, y:-playerSpeed};
        }
        case 68: {// right
            return {x: playerSpeed, y:state.y};
        }
        case 83: {// up
            return {x:state.x, y:playerSpeed};
        }
        case 0:{
            return{x:0, y:0};
        }
    }
    

    /*if(keyCode == 37){
        return {x: -12, y:0};
    }
    if (keyCode == 37 && keyCode == 38){
        return {x: -12, y:-12};
    }*/
}

function resetVelocity(keyCode){

}