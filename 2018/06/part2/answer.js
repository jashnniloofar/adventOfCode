const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const points = input.split(/\r?\n/).map((line) => line.split(", ").map((s) => parseInt(s)));

const max =
    points.reduce(
        (max, arr) =>
            Math.max(
                max,
                arr.reduce((a, b) => Math.max(a, b), 0)
            ),
        0
    ) + 1;

function manhatanDistance([x1, y1], [x2, y2]) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

let regionSize = 0;
for (let i = 0; i < max; i++) {
    for (let j = 0; j < max; j++) {
        const distances = points.map((point) => manhatanDistance(point, [i, j]));
        const sum = distances.reduce((sum, a) => sum + a, 0);
        if (sum < 10000) regionSize++;
    }
}

console.log(`Answer: ${regionSize}`);
console.log(`Run time: ${Date.now() - start} ms`);
