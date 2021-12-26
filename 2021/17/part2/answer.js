const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();

const numbers = input.match(/[0-9\-]+/g).map((p) => parseInt(p));
const startX = numbers[0];
const endX = numbers[1];
const startY = numbers[2];
const endY = numbers[3];

const reachX = new Map();

function pushToStep(map, step, x) {
    if (!map.has(step)) {
        map.set(step, []);
    }
    map.set(step, [...map.get(step), x]);
}

for (let x = 0; x <= endX; x++) {
    let change = x;
    let pos = 0;
    let step = 1;
    while (change > 0 && pos <= endX) {
        pos = pos + change;
        if (pos >= startX && pos <= endX) {
            pushToStep(reachX, step, x);
        }
        step++;
        change--;
    }
    if (change === 0 && pos >= startX && pos <= endX) {
        for (let i = step; i < endX; i++) {
            pushToStep(reachX, i, x);
        }
    }
}
const reach = new Map();

for (let y = startY; y <= endX; y++) {
    let change = y;
    let pos = 0;
    let step = 1;
    while (change > 0 || pos >= startY) {
        pos = pos + change;
        if (pos >= startY && pos <= endY) {
            if (reachX.has(step)) {
                const stepsX = reachX.get(step);
                for (const x of stepsX) {
                    reach.set(`${x},${y}`, 1);
                }
            }
        }
        step++;
        change--;
    }
}
console.log(`Answer: ${reach.size}`);
