/*
 * GAME options 
 */

const FRAME_RATE = 120;
const gameHeight = 700;
const gameWidth = 1360;

/*
 * Player options and constants
 */
const playerSpeed = 16;
const manaRegen = 0.05;
const hpRegen =0.0025;

/*
 * Skills setup
 */
const firstSkill={
    damage: 15,
    mana: 30,
};
const secondSkill={
    damage: 25,
    mana: 25,
}
const firstSkillHotkey = 81;
const secondSkillHotkey = 49;


module.exports = {
    FRAME_RATE,
    gameHeight,
    gameWidth,
    playerSpeed,
    firstSkill,
    manaRegen,
    hpRegen,
    firstSkillHotkey,
    secondSkillHotkey,
    secondSkill,
}