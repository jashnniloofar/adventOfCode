const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\r?\n/).map((line) => line.split(""));
const directions = [([x, y]) => [x - 1, y], ([x, y]) => [x, y + 1], ([x, y]) => [x + 1, y], ([x, y]) => [x, y - 1]];

let [row, col] = [Math.floor(map.length / 2), Math.floor(map.length / 2)];
let dirIndex = 0;
let count = 0;

for (let i = 0; i < 10000; i++) {
    if (map[row] === undefined) map[row] = [];
    dirIndex = ((map[row][col] === "#" ? dirIndex + 1 : dirIndex - 1) + 4) % 4;
    map[row][col] = map[row][col] === "#" ? "." : "#";
    count += map[row][col] === "#";
    [row, col] = directions[dirIndex]([row, col]);
}

console.log(`Answer: ${count}`);
console.log(`Run time: ${Date.now() - start} ms`);
