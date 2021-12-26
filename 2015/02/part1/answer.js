const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const presents = input.split(/\r?\n/).map((line) =>
    line
        .split("x")
        .map((d) => parseInt(d))
        .sort((a, b) => a - b)
);

let sum = 0
for (const present of presents) {
    sum += 3 * present[0] * present[1] + 2 * present[1] * present[2] + 2 * present[0] * present[2];
}

console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
