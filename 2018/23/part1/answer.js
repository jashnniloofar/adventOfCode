const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const nanobots = input.split(/\r?\n/).map((line) => line.match(/\-?\d+/g).map((s) => +s));

function maxSignal() {
    let maxIndex = 0;
    nanobots.forEach((nanaobot, i) => {
        if (nanaobot[3] > nanobots[maxIndex][3]) maxIndex = i;
    });
    return maxIndex;
}

function manhatanDistance([x1, y1, z1], [x2, y2, z2]) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1);
}

const [x, y, z, r] = nanobots[maxSignal()];

let count = 0;
for (const nanobot of nanobots) {
    const [x2, y2, z2, r2] = nanobot;
    if (manhatanDistance([x, y, z], [x2, y2, z2]) <= r) count++;
}

console.log(`Answer: ${count}`);
console.log(`Run time: ${Date.now() - start} ms`);
