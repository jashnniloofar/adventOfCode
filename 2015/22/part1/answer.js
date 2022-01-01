const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

let minMana = Number.MAX_SAFE_INTEGER;
function nextTurn(playerHp, bossHp, mana, usedMana, shield, poison, recharge) {
    // console.log(playerHp, bossHp, mana, usedMana, shield, poison, recharge);
    if (mana < 0) return;
    if (usedMana >= minMana) return;
    //Boss attack
    playerHp = shield > 0 ? playerHp - 1 : playerHp - 8;
    //Boss killed?
    if (bossHp <= 0) return (minMana = usedMana);
    //Player Killed?
    if (playerHp <= 0) return;
    if (poison > 0) bossHp = bossHp - Math.min(poison, 2) * 3;
    if (recharge > 0) mana = mana + 202;

    poison = Math.max(0, poison - 2);
    shield = Math.max(0, shield - 2);
    recharge = Math.max(0, recharge - 2);
    //Magic Missile
    nextTurn(playerHp, bossHp - 4, mana - 53, usedMana + 53, shield, poison, recharge);
    //Drain
    nextTurn(playerHp + 2, bossHp - 2, mana - 73, usedMana + 73, shield, poison, recharge);
    if (shield === 0) nextTurn(playerHp, bossHp, mana - 113, usedMana + 113, 6, poison, recharge);
    //Poison
    if (poison === 0) nextTurn(playerHp, bossHp - 3, mana - 173, usedMana + 173, shield, 5, recharge);
    //Recharge
    if (recharge === 0) nextTurn(playerHp, bossHp, mana - 229, usedMana + 229, shield, poison, 6);
}
nextTurn(58, 55, 500, 0, 0, 0, 0);

console.log(`Answer: ${minMana}`);
console.log(`Run time: ${Date.now() - start} ms`);
