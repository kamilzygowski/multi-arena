module.exports = {
    createGameState,
    gameLoop,
}

function createGameState() {
    
return {
    player: {
        pos: {
            x: 10,
            y: 10
        },
        speed: {
            x:0,
            y:0
        }
    },
    healingPotion: {
        x: 0,
        y:0,
    }
}
}

function gameLoop(state) {
    if (!state){
        return;
    }

    const playerOne = state.player;

    playerOne.pos.x += playerOne.speed.x;
    playerOne.pos.y += playerOne.speed.y;

    if(playerOne.pos.x < 0 || playerOne.pos.y < 0){
        return 2;
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