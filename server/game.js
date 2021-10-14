module.exports = {
    gameLoop,
    getUpdatedVelocity,
    initGame,
}

function initGame() {
    const state = createGameState();
    return state;
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
        }
    }, {
        pos: {
            x: 1110,
            y: 460
        },
        vel: {
            x:0,
            y:0
        }
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

    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;

    playerTwo.pos.x += playerTwo.vel.x;
    playerTwo.pos.y += playerTwo.vel.y;

    if(playerTwo.pos.x < 0 || playerTwo.pos.y < 0){
        return 2;
    }

    if(playerTwo.pos.x < 0 || playerTwo.pos.y < 0){
        return 1;
    }

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