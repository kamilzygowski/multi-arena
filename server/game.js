const { gameHeight, gameWidth, playerSpeed, firstSkill, manaRegen, hpRegen } = require('./constants');

let canIMove = true;

module.exports = {
    gameLoop,
    getUpdatedVelocity,
    initGame,
    getUpdatedHp,
    imageFlip,
    getUpdatedSkill1,
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
        if (colliderObject === 'playersCollision') {

        }
    }
}

function collision2(object1, object2, colliderObject) {
    var dx = object1.pos.x - object2.x;
    var dy = object1.pos.y - object2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < object1.radius + object2.radius) {
        if (colliderObject === 'playersCollision') {

        }
        if(colliderObject === 'Skill1Player1'){
            console.log('player 1 is damageeed!');
        }
        if(colliderObject === 'Skill1Player2'){
            console.log('player 2 is damaged');
        }
    }
}

function createGameState() {

    return {
        players: [{
            id: 0,
            hp: 100,
            mana: 200,
            pos: {
                x: 620,
                y: 460
            },
            vel: {
                x: 0,
                y: 0
            },
            radius: 30,
            img: './images/player.png',
        }, {
            id: 1,
            hp: 100,
            mana: 200,
            pos: {
                x: 1110,
                y: 460
            },
            vel: {
                x: 0,
                y: 0
            },
            radius: 30,
            img: './images/player2.png',
        }
        ],
        healingPotion: {},
        skill1: {},
    };
}

function gameLoop(state) {
    if (!state) {

        return;
    }

    const playerOne = state.players[0];
    const playerTwo = state.players[1];

    const skill1 = state.skill1;

    collision(playerOne, playerTwo, 'playersCollision');
    if(playerOne){
    collision2(playerOne, skill1, 'Skill1Player1');
    }
    if(playerTwo){
    collision2(playerTwo, skill1, 'Skill1Player2');
    }

    /**
     * 
     This block is controling where is the edge of the screen and makes player not corssing those edges
     *
     **/
    if (canIMove) {
        if (playerOne.pos.x < gameWidth && playerOne.pos.x > 0) {
            playerOne.pos.x += playerOne.vel.x;
        } else if (playerOne.pos.x >= gameWidth && playerOne.vel.x < 0) {
            playerOne.pos.x += playerOne.vel.x;
        } else if (playerOne.pos.x <= 0 && playerOne.vel.x > 0) {
            playerOne.pos.x += playerOne.vel.x;
        }
        if (playerOne.pos.y < gameHeight && playerOne.pos.y > 0) {
            playerOne.pos.y += playerOne.vel.y;
        } else if (playerOne.pos.y >= gameHeight && playerOne.vel.y < 0) {
            playerOne.pos.y += playerOne.vel.y;
        } else if (playerOne.pos.y <= 0 && playerOne.vel.y > 0) {
            playerOne.pos.y += playerOne.vel.y;
        }

        if (playerTwo.pos.x < gameWidth && playerTwo.pos.x > 0) {
            playerTwo.pos.x += playerTwo.vel.x;
        } else if (playerTwo.pos.x >= gameWidth && playerTwo.vel.x < 0) {
            playerTwo.pos.x += playerTwo.vel.x;
        } else if (playerTwo.pos.x <= 0 && playerTwo.vel.x > 0) {
            playerTwo.pos.x += playerTwo.vel.x;
        }
        if (playerTwo.pos.y < gameHeight && playerTwo.pos.y > 0) {
            playerTwo.pos.y += playerTwo.vel.y;
        } else if (playerTwo.pos.y >= gameHeight && playerTwo.vel.y < 0) {
            playerTwo.pos.y += playerTwo.vel.y;
        } else if (playerTwo.pos.y <= 0 && playerTwo.vel.y > 0) {
            playerTwo.pos.y += playerTwo.vel.y;
        }
    }    /*
    * The end of player not going out!
    */

    /**
     * if one of the players dies, end the game and choose winner
     */
    if (playerOne.hp <= 0) {
        return 2;
    }

    if (playerTwo.hp <= 0) {
        return 1;
    }


    /**
     * If mana and hp is not full regenerate it during the time
     */
    if (playerOne.mana < 200) {
        playerOne.mana += manaRegen;
    }
    if (playerTwo.mana < 200) {
        playerTwo.mana += manaRegen;
    }

    if (playerOne.hp < 100) {
        playerOne.hp += hpRegen;
    }
    if (playerTwo.hp < 100) {
        playerTwo.hp += hpRegen;
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

function getUpdatedVelocity(keyCode, state) {

    if(state !== null){
    switch (keyCode) {
        case 37: {// left
            return { x: -playerSpeed, y: state.y };
        }
        case 38: {// down
            return { x: state.x, y: -playerSpeed };
        }
        case 39: {// right
            return { x: playerSpeed, y: state.y };
        }
        case 40: {// up
            return { x: state.x, y: playerSpeed };
        }
        case 65: {// left
            return { x: -playerSpeed, y: state.y };
        }
        case 87: {// down
            return { x: state.x, y: -playerSpeed };
        }
        case 68: {// right
            return { x: playerSpeed, y: state.y };
        }
        case 83: {// up
            return { x: state.x, y: playerSpeed };
        }
        case 0: {
            return { x: 0, y: 0 };
        }
    }
    }
}

function imageFlip(keyCode, state) {
    if (keyCode === 65 || keyCode === 37) {
        if (state === 0) {
            return './images/player.png';
        }
        if (state === 1) {
            return './images/player2.png';
        }
    }
    if (keyCode === 68 || keyCode === 39) {
        if (state === 0) {
            return './images/playerF.png';
        }
        if (state === 1) {
            return './images/player2F.png';
        }
    }
}


function getUpdatedHp(keyCode) {
    if (keyCode === 81) { // Skill 1

        return firstSkill;
    }
}

function getUpdatedSkill1(keyCode, state){
    if(keyCode === 81){
        return { x: state.pos.x-64, y:state.pos.y-64, radius:128};
    }
}

function resetVelocity(keyCode) {

}