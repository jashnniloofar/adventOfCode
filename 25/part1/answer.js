const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\r?\n/).map((line) => line.split("").map((char) => (char === "." ? 0 : char === ">" ? 1 : 2)));
const colCount = map[0].length;
const rowCount = map.length;

let current = map;
let step = 0;
let changed = false;
do {
    changed = false;
    let next = current.map((line) => line.slice());
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (current[i][j] === 1 && current[i][(j + 1) % colCount] === 0) {
                next[i][j] = 0;
                next[i][(j + 1) % colCount] = 1;
                changed = true;
            }
        }
    }
    current = next.map((line) => line.slice());

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (current[i][j] === 2 && current[(i + 1) % rowCount][j] === 0) {
                next[i][j] = 0;
                next[(i + 1) % rowCount][j] = 2;
                changed = true;
            }
        }
    }
    step++;
    current = next.map((line) => line.slice());
} while (changed);

console.log(`Answer: ${step}`);
console.log(`Run time: ${Date.now() - start} ms`);
