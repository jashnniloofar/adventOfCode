const fs = require("fs");

const input = fs.readFileSync("./sample.txt").toString();

const numbers = input.match(/[0-9\-]+/g);
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

for (let x = 0; x < endX; x++) {
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
let max = 0;

for (let y = 0; y < endX; y++) {
    let change = y;
    let pos = 0;
    let step = 1;
    let maxY = 0;
    while (change > 0 || pos >= startY) {
        pos = pos + change;
        if (pos > maxY) maxY = pos;
        if (pos >= startY && pos <= endY) {
            if (reachX.has(step) && maxY > max) {
                max = maxY
            }
        }
        step++;
        change--;
    }
}

console.log(`Answer: ${max}`);
