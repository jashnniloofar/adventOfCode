const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\r?\n/).map((line) => line.split(""));

function run() {
    let step = 0;
    let row = 0;
    let col = map[0].findIndex((p) => p === "|");
    const directions = [([x, y]) => [x + 1, y], ([x, y]) => [x, y + 1], ([x, y]) => [x - 1, y], ([x, y]) => [x, y - 1]];
    let dirIndex = 0;
    while (map[row][col] !== " ") {
        [row, col] = directions[dirIndex]([row, col]);
        if (map[row][col] === "+") {
            const [rowLeft, colLeft] = directions[(dirIndex + 1) % 4]([row, col]);
            if (map[rowLeft][colLeft] !== " ") dirIndex = (dirIndex + 1) % 4;
            else dirIndex = (dirIndex + 3) % 4;
        }
        step++
    }
    return step
}

console.log(`Answer: ${run()}`);
console.log(`Run time: ${Date.now() - start} ms`);
