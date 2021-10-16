const {gameHeight, gameWidth} = require('./constants');

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
    var dx = object1.x - object2.x;
    var dy = object1.y - object2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < object1.radius + object2.radius) {
        if (colliderObject == 'playersCollision'){
            console.log('xDDDDD');
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
        radius: 60,
    }, {
        pos: {
            x: 1110,
            y: 460
        },
        vel: {
            x:0,
            y:0
        },
        radius: 60,
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

    /**
     * 
     This block is controling where is the edge of the screen and makes player not corssing those edges
     *
     **/

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
    /*
    * The end of player not going out!
    */ 

    /*if(playerTwo.pos.x < 0 || playerTwo.pos.y < 0){
        return 2;
    }

    if(playerTwo.pos.x < 0 || playerTwo.pos.y < 0){
        return 1;
    }*/

    collision(playerOne.pos, playerTwo.pos, 'playersCollision');

    return false;
}

function healingPotions(state) {
    healingPotion = {
        x: Math.floor(Math.random() * 50),
        y: Math.floor(Math.random() * 50),
    }

    state.healingPotion = healingPotion;
}

function getUpdatedVelocity(keyCode){
    switch (keyCode) {
        case 37: {// left
            return {x: -12, y:0};
        }
        case 38: {// down
            return {x: 0, y:-12};
        }
        case 39: {// right
            return {x: 12, y:0};
        }
        case 40: {// up
            return {x: 0, y:12};
        }
        case 0:{
            return{x:0, y:0};
        }
    }
}

function resetVelocity(keyCode){

}