const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const boss = {
    hitPoint: parseInt(lines[0].match(/Hit Points: ([0-9]+)/)[1]),
    damage: parseInt(lines[1].match(/Damage: ([0-9]+)/)[1]),
    armor: parseInt(lines[2].match(/Armor: ([0-9]+)/)[1]),
};
const playerHitpoint = 100;
const weapons = [
    { cost: 8, damage: 4, armor: 0 },
    { cost: 10, damage: 5, armor: 0 },
    { cost: 25, damage: 6, armor: 0 },
    { cost: 40, damage: 7, armor: 0 },
    { cost: 74, damage: 8, armor: 0 },
];

const armors = [
    { cost: 0, damage: 0, armor: 0 },
    { cost: 13, damage: 0, armor: 1 },
    { cost: 31, damage: 0, armor: 2 },
    { cost: 53, damage: 0, armor: 3 },
    { cost: 75, damage: 0, armor: 4 },
    { cost: 102, damage: 0, armor: 5 },
];

const rings = [
    { cost: 0, damage: 0, armor: 0 },
    { cost: 25, damage: 1, armor: 0 },
    { cost: 50, damage: 2, armor: 0 },
    { cost: 100, damage: 3, armor: 0 },
    { cost: 20, damage: 0, armor: 1 },
    { cost: 40, damage: 0, armor: 2 },
    { cost: 80, damage: 0, armor: 3 },
];

function sumStat(stat1, stat2) {
    return { cost: stat1.cost + stat2.cost, damage: stat1.damage + stat2.damage, armor: stat1.armor + stat2.armor };
}
const ringCombinations = [{ cost: 0, damage: 0, armor: 0 }];
for (let i = 0; i < rings.length; i++) {
    for (let j = i + 1; j < rings.length; j++) {
        ringCombinations.push(sumStat(rings[i], rings[j]));
    }
}

function canWin(player) {
    const playerMoves = Math.ceil(boss.hitPoint / Math.max(player.damage - boss.armor, 1));
    const bossMoves = Math.ceil(playerHitpoint / Math.max(boss.damage - player.armor, 1));
    return playerMoves <= bossMoves;
}
let min = Number.MAX_VALUE;
weapons.forEach((weapon) => {
    armors.forEach((armor) => {
        ringCombinations.forEach((ring) => {
            const player = sumStat(sumStat(weapon, armor), ring);
            if (canWin(player) && player.cost < min) {
                min = player.cost;
            }
        });
    });
});

console.log(`Answer: ${min}`);
console.log(`Run time: ${Date.now() - start} ms`);
