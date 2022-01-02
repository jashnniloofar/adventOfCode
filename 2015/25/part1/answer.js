const fs = require("fs");
let start = Date.now();
const [row, column] = fs
    .readFileSync("./input.txt")
    .toString()
    .match(/[0-9]+/g)
    .map((p) => parseInt(p));

function next(row, col) {
    if (row === 1) return [col + 1, 1];
    else return [row - 1, col + 1];
}

let i = 1;
let j = 1;
let current = 20151125;
while (i !== row || j !== column) {
    [i, j] = next(i, j);
    current = (current * 252533) % 33554393;
}

console.log(`Answer: ${current}`);
console.log(`Run time: ${Date.now() - start} ms`);
