const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/).map((line) => parseInt(line));
const reached = {};
let index = 0;
let sum = 0;
while (reached[sum] === undefined) {
    reached[sum] = true;
    sum += lines[index];
    index = index === lines.length - 1 ? 0 : index + 1;
}

console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
