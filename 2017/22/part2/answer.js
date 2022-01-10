const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\r?\n/).map((line) => line.split(""));
const directions = [([x, y]) => [x - 1, y], ([x, y]) => [x, y + 1], ([x, y]) => [x + 1, y], ([x, y]) => [x, y - 1]];

let [row, col] = [Math.floor(map.length / 2), Math.floor(map.length / 2)];
let dirIndex = 0;
let count = 0;

for (let i = 0; i < 10000000; i++) {
    if (map[row] === undefined) map[row] = [];
    switch (map[row][col]) {
        case "#":
            map[row][col] = "F";
            dirIndex = (dirIndex + 1) % 4;
            break;
        case "W":
            map[row][col] = "#";
            count++;
            break;
        case "F":
            map[row][col] = ".";
            dirIndex = (dirIndex + 2) % 4;
            break;
        default:
            map[row][col] = "W";
            dirIndex = (dirIndex + 3) % 4;
            break;
    }
    [row, col] = directions[dirIndex]([row, col]);
}

console.log(`Answer: ${count}`);
console.log(`Run time: ${Date.now() - start} ms`);
