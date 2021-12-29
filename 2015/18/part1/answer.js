const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\r?\n/).map((line) => line.split("").map((s) => (s === "#" ? 1 : 0)));

function isOn(map, i, j) {
    if (i < 0 || i >= map.length || j < 0 || j >= map.length) return 0;
    return map[i][j];
}
function nextStep(map) {
    let next = [];
    for (let i = 0; i < map.length; i++) {
        next[i] = [];
        for (let j = 0; j < map.length; j++) {
            const neighbors =
                isOn(map, i - 1, j - 1) +
                isOn(map, i - 1, j) +
                isOn(map, i - 1, j + 1) +
                isOn(map, i, j - 1) +
                isOn(map, i, j + 1) +
                isOn(map, i + 1, j - 1) +
                isOn(map, i + 1, j) +
                isOn(map, i + 1, j + 1);
            if (neighbors === 3 || (isOn(map, i, j) === 1 && neighbors === 2)) {
                next[i][j] = 1;
            } else next[i][j] = 0;
        }
    }
    return next;
}
let current = map;
for (let i = 0; i < 100; i++) {
    current = nextStep(current);
}

let sum = 0;
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
        sum += current[i][j];
    }
}

console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
