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

const map = [];
for (let i = 0; i < max; i++) {
    map[i] = [];
    for (let j = 0; j < max; j++) {
        const distances = points.map((point) => manhatanDistance(point, [i, j]));
        const minDistance = Math.min(...distances);
        if (distances.filter((d) => d === minDistance).length === 1) {
            map[i][j] = distances.indexOf(minDistance);
        }
    }
}
const infinites = new Set();
for (let i = 0; i < max; i++) {
    infinites.add(map[0][i]);
    infinites.add(map[i][0]);
    infinites.add(map[max - 1][i]);
    infinites.add(map[i][max - 1]);
}

const areaSizes = Array(points.length).fill(0);
for (let i = 0; i < max; i++) {
    for (let j = 0; j < max; j++) {
        if (!infinites.has(map[i][j]) && map[i][j] !== undefined) {
            areaSizes[map[i][j]]++;
        }
    }
}

console.log(`Answer: ${Math.max(...areaSizes)}`);
console.log(`Run time: ${Date.now() - start} ms`);
