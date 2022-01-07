const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/).map((line) => line.split("\t").map((s) => parseInt(s.trim())));

let sum = 0
for (const line of lines) {
    sum+= Math.max(...line) - Math.min(...line);
}
console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
