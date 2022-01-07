const fs = require("fs");
let start = Date.now();
const input = parseInt(fs.readFileSync("./input.txt").toString());

let spiralNum = 1;
while ((2 * spiralNum + 1) ** 2 < input) {
    spiralNum++;
}
let num = (2 * spiralNum - 1) ** 2 + 1;
let row = spiralNum - 1;
let col = spiralNum;
const directions = [([i, j]) => [i, j - 1], ([i, j]) => [i - 1, j], ([i, j]) => [i, j + 1], ([i, j]) => [i + 1, j]];
let directionIndex = 0;
while (num !== input) {
    [col, row] = directions[directionIndex]([col, row]);
    num++;
    if (Math.abs(col) === Math.abs(row)) directionIndex++;
}
console.log(spiralNum);

console.log(`Answer: ${Math.abs(col) + Math.abs(row)}`);
console.log(`Run time: ${Date.now() - start} ms`);
