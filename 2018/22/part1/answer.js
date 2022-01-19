const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const depth = +lines[0].match(/[\d]+/);
const target = lines[1].match(/[\d]+/g).map((s) => +s);
function risk(depth, target) {
    const [targetX, targetY] = target;
    let risk = 0;
    const eI = [];
    for (let y = 0; y <= targetY; y++) {
        eI[y] = [];

        for (let x = 0; x <= targetX; x++) {
            let gI = 0;
            if (y === 0) gI = x * 16807;
            else if (x === 0) gI = y * 48271;
            else gI = eI[y - 1][x] * eI[y][x - 1];
            eI[y][x] = (gI + depth) % 20183;
            risk += eI[y][x] % 3;
        }
    }
    return risk - (eI[targetY][targetX] % 3);
}

console.log(`Answer: ${risk(depth, target)}`);
console.log(`Run time: ${Date.now() - start} ms`);
